import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUsersService from '@modules/users/services/ShowUsersService';
import RemoveUserService from '@modules/users/services/RemoveUserService';
import GetUserService from '@modules/users/services/GetUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, username, role } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      username,
      name,
      email,
      password,
      role,
    });

    return res.json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.params.id;
    const { username, name, email, role, password, old_password } = req.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      username,
      name,
      email,
      role,
      old_password,
      password,
      user_id,
    });

    return res.json(instanceToInstance(user));
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;

    const getUsers = container.resolve(GetUserService);
    const user = await getUsers.execute(username);

    const userParse = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.json(userParse);
  }

  public async showAll(req: Request, res: Response): Promise<Response> {
    const { role } = req.params;

    const showUsers = container.resolve(ShowUsersService);

    const users = await showUsers.execute(role);

    return res.json(instanceToInstance(users));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;

    const removeUser = container.resolve(RemoveUserService);

    await removeUser.execute(username);

    return res.sendStatus(200);
  }
}
