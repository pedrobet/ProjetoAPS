import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/database/schemas/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(username: string): Promise<User> {
    const checkUserExists = await this.usersRepository.findByName(username);

    if (!checkUserExists) {
      throw new AppError('Username não encontrado.');
    }
    return checkUserExists;
  }
}
export default GetUserService;
