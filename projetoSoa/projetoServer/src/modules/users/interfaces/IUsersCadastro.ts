import User from '@modules/users/infra/database/schemas/User';
import { PartialWithRequiredBy } from 'fireorm';

export interface ICreateUserData {
  username: string;
  email: string;
  name: string;
  role: 'admin' | 'acs';
  password: string;
}

export default interface IUsersCadastro {
  findByID(id: string): Promise<User | undefined | null>;
  findByRole(role: string): Promise<User[] | undefined | null>;
  findByName(name: string): Promise<User | undefined | null>;
  findByEmail(email: string): Promise<User | undefined | null>;
  create(data: ICreateUserData): Promise<User>;
  remove(username: string): Promise<void>;
  save(entity: User): Promise<User | PartialWithRequiredBy<User, '_id'>>;
}
