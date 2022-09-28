import authConfig from '@config/auth';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import AppError from '@shared/errors/AppError';
import { instanceToInstance } from 'class-transformer';
import { add } from 'date-fns';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import UsersCadastro from '../../database/cadastros/UsersCadastro';
import UserTokensCadastro from '../../database/cadastros/UserTokensCadastro';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const userTokensCadastro = UserTokensCadastro.getInstance();
    const usersCadastro = UsersCadastro.getInstance();
    const hashProvider = BCryptHashProvider.getInstance();

    let userFinded = await usersCadastro.findByName(username);

    if (!userFinded) {
      throw new AppError('Incorrect user/password combination.', 401);
    }

    const passwordMatched = await hashProvider.comapreHash(
      password,
      userFinded.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect user/password combination.', 401);
    }

    const { secret, expiresIn, refresh } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(userFinded._id),
      expiresIn,
    });

    const refresh_token = sign({}, refresh.secret, {
      subject: String(userFinded._id),
      expiresIn: refresh.expiresIn,
    });

    await userTokensCadastro.removeById(String(userFinded._id));

    await userTokensCadastro.create({
      user_id: String(userFinded._id),
      expiresAt: add(new Date(), {
        minutes: refresh.minutes,
      }),
      refresh_token,
    });

    return res.json({
      user: instanceToInstance(userFinded),
      token,
      refresh_token,
    });
  }
}
