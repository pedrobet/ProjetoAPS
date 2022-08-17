import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token, refresh_token } = await authenticateUser.execute({
      user: username,
      password,
    });

    return res.json({ user: instanceToInstance(user), token, refresh_token });
  }
}
