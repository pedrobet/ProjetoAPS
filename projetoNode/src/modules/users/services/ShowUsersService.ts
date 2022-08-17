import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../infra/database/schemas/User';

@injectable()
class ShowUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(role: string): Promise<User[]> {
    const user = await this.usersRepository.findByRole(role);

    const mappedUsers = user?.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
      };
    }) as User[];

    if (!user) {
      throw new AppError('Usuários não encontrados!');
    }
    return mappedUsers;
  }
}

export default ShowUsersService;
