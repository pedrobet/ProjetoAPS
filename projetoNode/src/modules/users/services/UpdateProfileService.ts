import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/database/schemas/User';
import { PartialWithRequiredBy } from 'fireorm';

interface IRequest {
  user_id: string;
  username: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    username,
    name,
    email,
    password,
    old_password,
  }: IRequest):  Promise<User | PartialWithRequiredBy<User, 'id'>>{
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedUsername = await this.usersRepository.findByName(
      username,
    );

    if (
      userWithUpdatedUsername &&
      String(userWithUpdatedUsername.id) !== user_id
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
      const checkOldPassword = await this.hashProvider.comapreHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
      user.password = await this.hashProvider.generateHash(password);
    }
    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
