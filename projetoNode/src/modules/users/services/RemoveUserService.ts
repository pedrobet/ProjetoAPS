import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(username: string): Promise<void> {
    const checkUserExists = await this.usersRepository.findByName(username);

    if (!checkUserExists) {
      throw new AppError('User not found');
    }

    await this.usersRepository.remove(username);
  }
}

export default CreateUserService;
