import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import AppError from '@shared/errors/AppError';
import UsersCadastro from '../../database/cadastros/UsersCadastro';
import User from '../../database/schemas/User';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, username, role } = req.body;

    const usersCadastro = UsersCadastro.getInstance();
    const hashProvider = BCryptHashProvider.getInstance();

    const checkUserExists = await usersCadastro.findByName(username);

    if (checkUserExists) {
      throw new AppError('Username já existente.');
    }

    const checkEmail = await usersCadastro.findByEmail(email);

    if (checkEmail) {
      throw new AppError('E-mail já existente.');
    }

    const hashedPassword = await hashProvider.generateHash(password);

    const user = await usersCadastro.create({
      username,
      name,
      email,
      role,
      password: hashedPassword,
    });

    return res.json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.params.id;
    const { username, name, email, role, password, old_password } = req.body;

    const usersCadastro = UsersCadastro.getInstance();
    const hashProvider = BCryptHashProvider.getInstance();

    const user = await usersCadastro.findByID(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado!');
    }

    const userWithUpdatedUsername = await usersCadastro.findByName(username);

    if (
      userWithUpdatedUsername &&
      String(userWithUpdatedUsername._id) !== user._id.toString()
    ) {
      throw new AppError('Username já esta em uso!');
    }

    Object.assign(user, {
      name,
      email,
      username,
      role,
    });

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha atual para alterar a senha!',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await hashProvider.comapreHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Senha atual incorreta!');
      }
      user.password = await hashProvider.generateHash(password);
    }
    await usersCadastro.save(user);

    return res.json(instanceToInstance(user));
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;

    const usersCadastro = UsersCadastro.getInstance();

    const checkUserExists = await usersCadastro.findByName(username);

    if (!checkUserExists) {
      throw new AppError('Username não encontrado.');
    }

    const userParse = {
      id: checkUserExists._id,
      username: checkUserExists.username,
      name: checkUserExists.name,
      email: checkUserExists.email,
      role: checkUserExists.role,
    };

    return res.json(userParse);
  }

  public async showAll(req: Request, res: Response): Promise<Response> {
    const { role } = req.params;

    const usersCadastro = UsersCadastro.getInstance();

    const user = await usersCadastro.findByRole(role);

    const mappedUsers = user?.map((user: User) => {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
      };
    }) as User[];

    if (!user) {
      throw new AppError('Usuários não encontrados!');
    }

    return res.json(instanceToInstance(mappedUsers));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;
    const usersCadastro = UsersCadastro.getInstance();
    const checkUserExists = await usersCadastro.findByName(username);

    if (!checkUserExists) {
      throw new AppError('User not found');
    }

    await usersCadastro.remove(username);

    return res.sendStatus(200);
  }
}
