import { Request, Response } from 'express';

import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import AppError from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import UsersCadastro from '../../database/cadastros/UsersCadastro';
import UserTokensCadastro from '../../database/cadastros/UserTokensCadastro';

export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;
    const userTokensCadastro = UserTokensCadastro.getInstance();
    const usersCadastro = UsersCadastro.getInstance();
    const hashProvider = BCryptHashProvider.getInstance();

    const userToken = await userTokensCadastro.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await usersCadastro.findByID(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCraetedAt = userToken.created_at;
    const compareDate = addHours(tokenCraetedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await hashProvider.generateHash(password);

    await usersCadastro.save(user);

    return res.status(204).json();
  }
}
