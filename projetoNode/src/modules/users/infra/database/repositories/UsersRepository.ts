import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/database/schemas/User';

import { ICreateUserData } from '@modules/users/repositories/IUsersRepository';

import { getRepository, IRepository, PartialWithRequiredBy } from 'fireorm';

class UsersRepository implements IUsersRepository {
  private fireOrm: IRepository<User>;

  constructor() {
    this.fireOrm = getRepository(User);
  }

  public async findByName(username: string): Promise<User | undefined | null> {
    const user = await this.fireOrm
      .whereEqualTo('username', username)
      .findOne();
    return user;
  }

  public async findByRole(role: string): Promise<User[] | undefined | null> {
    const user = await this.fireOrm.whereEqualTo('role', role).find();
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined | null> {
    const user = await this.fireOrm.whereEqualTo('email', email).findOne();
    return user;
  }

  public async findByID(id: string): Promise<User | undefined | null> {
    const user = await this.fireOrm.whereEqualTo('id', id).findOne();

    return user;
  }

  public async findAll(): Promise<User[] | undefined | null> {
    const users = await this.fireOrm.find();

    return users;
  }

  public async remove(username: string): Promise<void> {
    const userToBeDeleted = await this.fireOrm
      .whereEqualTo('username', username)
      .findOne();
    if (userToBeDeleted) {
      await this.fireOrm.delete(userToBeDeleted?.id);
    }
  }

  public async create({
    username,
    email,
    name,
    role,
    password,
  }: ICreateUserData): Promise<User> {
    const user = new User();
    user.username = username;
    user.email = email;
    user.name = name;
    user.password = password;
    user.role = role;

    await this.fireOrm.create(user);

    return user;
  }

  public async save(
    entity: User,
  ): Promise<User | PartialWithRequiredBy<User, 'id'>> {
    const user = await this.fireOrm.whereEqualTo('id', entity.id).findOne();
    if (user) {
      const updatedUser = await this.fireOrm.update(entity);
      return updatedUser;
    } else {
      const newUser = await this.fireOrm.create(entity);
      return newUser;
    }
  }
}

export default UsersRepository;
