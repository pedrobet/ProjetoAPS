import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/database/schemas/UserToken';
import ICreateUserTokenDTO from '@modules/users/dtos/ICreateUserTokenDTO';

import { getRepository, IRepository } from 'fireorm';

class UserTokensRepository implements IUserTokensRepository {
  private fireOrm: IRepository<UserToken>;

  constructor() {
    this.fireOrm = getRepository(UserToken);
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

    const userToken = await this.fireOrm.create(token);

    return userToken;
  }

  public async findByUserIdAndToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined | null> {
    const userToken = await this.fireOrm
      .whereEqualTo('user_id', user_id)
      .whereEqualTo('refresh_token', refresh_token)
      .findOne();

    return userToken;
  }

  public async removeById(user_id: string): Promise<void> {
    const token_by_id = await this.fireOrm
      .whereEqualTo('user_id', user_id)
      .findOne();

    if (token_by_id) {
      await this.fireOrm.delete(token_by_id.id);
    }
  }

  public async findByToken(
    token: string,
  ): Promise<UserToken | undefined | null> {
    const userToken = await this.fireOrm
      .whereEqualTo('refresh_token', token)
      .findOne();

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const token = new UserToken();
    token.user_id = user_id;

    const userToken = this.fireOrm.create(token);

    return userToken;
  }
}

export default UserTokensRepository;
