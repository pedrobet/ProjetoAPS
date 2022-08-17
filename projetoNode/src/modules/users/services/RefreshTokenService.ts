import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { add, isAfter } from 'date-fns';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  refresh_token: string;
}

interface ITokenResponse {
  token: string;
  refreshToken?: string;
}

@injectable()
export default class RefreshTokenService {
  constructor(
    @inject('UserTokensRepository')
    private usersTokenRepository: IUserTokensRepository,
  ) {}

  public async execute({ refresh_token }: IRequest): Promise<ITokenResponse> {
    const {
      refresh,
      secret: tokenSecret,
      expiresIn: tokenexpiresIn,
    } = authConfig.jwt;

    // Verifica Refresh Token com a base e após isso gerar um novo Token e Refresh Token (caso o antigo tenha expirado)

    const userToken = await this.usersTokenRepository.findByToken(
      refresh_token,
    );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    const newToken = sign({}, tokenSecret, {
      subject: String(userToken.user_id),
      expiresIn: tokenexpiresIn,
    });

    if (isAfter(new Date(), userToken.expiresAt)) {
      // Refresh Token expirado, gerar um novo juntamente com o Token

      await this.usersTokenRepository.removeById(String(userToken.user_id));

      const refreshToken = sign({}, refresh.secret, {
        subject: String(userToken.user_id),
        expiresIn: refresh.expiresIn,
      });

      await this.usersTokenRepository.create({
        user_id: String(userToken.user_id),
        expiresAt: add(new Date(), {
          minutes: refresh.minutes,
        }),
        refresh_token: refreshToken,
      });
      return {
        token: newToken,
        refreshToken,
      };
    }

    return { token: newToken };
  }
}
