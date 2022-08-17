import UserToken from '@modules/users/infra/database/schemas/UserToken';
import ICreateUserTokenDTO from '@modules/users/dtos/ICreateUserTokenDTO';

export default interface IUserTokensRepository {
  create({
    expiresAt,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined | null>;
  removeById(user_id: string): Promise<void>;
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined | null>;
}
