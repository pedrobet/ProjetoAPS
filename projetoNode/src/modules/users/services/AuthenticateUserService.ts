import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";

import authConfig from "@config/auth";
import User from "@modules/users/infra/database/schemas/User";
import { add } from "date-fns";

import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  user: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refresh_token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("UserTokensRepository")
    private usersTokenRepository: IUserTokensRepository
  ) { }

  public async execute({ user, password }: IRequest): Promise<IResponse> {
    let userFinded = await this.usersRepository.findByName(user);

    if (!userFinded) {
      throw new AppError("Incorrect user/password combination.", 401);
    }

    const passwordMatched = await this.hashProvider.comapreHash(
      password,
      userFinded.password
    );

    if (!passwordMatched) {
      throw new AppError("Incorrect user/password combination.", 401);
    }

    const { secret, expiresIn, refresh } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(userFinded.id),
      expiresIn,
    });

    const refresh_token = sign({}, refresh.secret, {
      subject: String(userFinded.id),
      expiresIn: refresh.expiresIn,
    });

    await this.usersTokenRepository.removeById(String(userFinded.id));

    await this.usersTokenRepository.create({
      user_id: String(userFinded.id),
      expiresAt: add(new Date(), {
        minutes: refresh.minutes,
      }),
      refresh_token,
    });

    return {
      user: userFinded,
      token,
      refresh_token,
    };
  
  }
}
