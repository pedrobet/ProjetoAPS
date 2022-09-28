import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import UsersCadastro from '../../database/cadastros/UsersCadastro';
import AppError from '@shared/errors/AppError';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const usersCadastro = UsersCadastro.getInstance();
    const user = await usersCadastro.findByID(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return res.json({
      username: user.username,
      role: user.role,
      email: user.email,
      name: user.name,
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const usersCadastro = UsersCadastro.getInstance();
    const hashProvider = BCryptHashProvider.getInstance();

    const { username, name, email, password, old_password } = req.body;

    const user = await usersCadastro.findByID(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedUsername = await usersCadastro.findByName(username);

    if (
      userWithUpdatedUsername &&
      String(userWithUpdatedUsername._id) !== user_id
    ) {
      throw new AppError('Username already in use');
    }

    Object.assign(user, { name, email, username });

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await hashProvider.comapreHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
      user.password = await hashProvider.generateHash(password);
    }
    usersCadastro.save(user);

    return res.json(instanceToInstance(user));
  }
}
