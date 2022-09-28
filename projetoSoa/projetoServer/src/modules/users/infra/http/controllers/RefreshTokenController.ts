import { Request, Response } from 'express';
import authConfig from '@config/auth';
import UserTokensCadastro from '../../database/cadastros/UserTokensCadastro';
import AppError from '@shared/errors/AppError';
import { isAfter, add } from 'date-fns';
import { sign } from 'jsonwebtoken';

export default class RefreshTokenController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token } = req.body;
    const usersTokensCadastro = UserTokensCadastro.getInstance();

    const {
      refresh,
      secret: tokenSecret,
      expiresIn: tokenexpiresIn,
    } = authConfig.jwt;

    // Verifica Refresh Token com a base e após isso gerar um novo Token e Refresh Token (caso o antigo tenha expirado)

    const userToken = await usersTokensCadastro.findByToken(token);

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    const newToken = sign({}, tokenSecret, {
      subject: String(userToken.user_id),
      expiresIn: tokenexpiresIn,
    });

    if (isAfter(new Date(), userToken.expiresAt)) {
      // Refresh Token expirado, gerar um novo juntamente com o Token

      await usersTokensCadastro.removeById(String(userToken.user_id));

      const refreshToken = sign({}, refresh.secret, {
        subject: String(userToken.user_id),
        expiresIn: refresh.expiresIn,
      });

      await usersTokensCadastro.create({
        user_id: String(userToken.user_id),
        expiresAt: add(new Date(), {
          minutes: refresh.minutes,
        }),
        refresh_token: refreshToken,
      });

      return res.json({
        token: newToken,
        refreshToken,
      });
    }

    return res.json(newToken);
  }
}
