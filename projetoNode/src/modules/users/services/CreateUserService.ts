import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";

import User from "@modules/users/infra/database/schemas/User";
import ICreateUserDTO from "../dtos/ICreateUserDTO";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

  ) {}

  async execute({
    username,
    name,
    email,
    role,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByName(username);

    if (checkUserExists) {
      throw new AppError("Username já existente.");
    }

    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError("E-mail já existente.");
    }


    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      username,
      name,
      email,
      role,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
