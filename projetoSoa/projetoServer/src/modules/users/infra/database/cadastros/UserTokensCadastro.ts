import IUserTokensCadastro from '@modules/users/interfaces/IUserTokensCadastro';

import ICreateUserTokenDTO from '@modules/users/dtos/ICreateUserTokenDTO';
import UserToken from '@modules/users/infra/database/schemas/UserToken';

import { getRepository, IRepository } from 'fireorm';

import { MongoRepository, getMongoRepository } from 'typeorm';

class UserTokensCadastro implements IUserTokensCadastro {
  private ormRepository: MongoRepository<UserToken>;
  private static INSTANCE: UserTokensCadastro;

  constructor() {
    this.ormRepository = getMongoRepository(UserToken, 'mongo');
  }

  public static getInstance(): UserTokensCadastro {
    if (!UserTokensCadastro.INSTANCE) {
      UserTokensCadastro.INSTANCE = new UserTokensCadastro();
    }
    return UserTokensCadastro.INSTANCE;
  }

  public async create({
    expiresAt,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const token = new UserToken();
    token.expiresAt = expiresAt;
    token.refresh_token = refresh_token;
    token.user_id = user_id;

    const userToken = await this.ormRepository.save(token);

    return userToken;
  }

  public async findByUserIdAndToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined | null> {
    const userToken = await this.ormRepository.findOne({
      where: [{ user_id: user_id }, { refresh_token: refresh_token }],
    });

    return userToken;
  }

  public async removeById(user_id: string): Promise<void> {
    const token_by_id = await this.ormRepository.findOne({
      where: { user_id: user_id },
    });

    if (token_by_id) {
      await this.ormRepository.delete(token_by_id._id);
    }
  }

  public async findByToken(
    token: string,
  ): Promise<UserToken | undefined | null> {
    const userToken = await this.ormRepository.findOne({
      where: { refresh_token: token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const token = new UserToken();
    token.user_id = user_id;

    const userToken = this.ormRepository.save(token);

    return userToken;
  }
}

export default UserTokensCadastro;
