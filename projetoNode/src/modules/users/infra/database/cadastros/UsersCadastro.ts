import IUsersCadastro from '@modules/users/interfaces/IUsersCadastro';

import User from '@modules/users/infra/database/schemas/User';

import { ICreateUserData } from '@modules/users/interfaces/IUsersCadastro';

import { getRepository, IRepository, PartialWithRequiredBy } from 'fireorm';
import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';

class UsersCadastro implements IUsersCadastro {
  private ormRepository: MongoRepository<User>;
  private static INSTANCE: UsersCadastro;

  constructor() {
    this.ormRepository = getMongoRepository(User, 'mongo');
  }

  public static getInstance(): UsersCadastro {
    if (!UsersCadastro.INSTANCE) {
      UsersCadastro.INSTANCE = new UsersCadastro();
    }
    return UsersCadastro.INSTANCE;
  }

  public async findByName(username: string): Promise<User | undefined | null> {
    const user = await this.ormRepository.findOne({ where: { username } });
    return user;
  }

  public async findByRole(role: string): Promise<User[] | undefined | null> {
    const user = await this.ormRepository.find({ where: { role } });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined | null> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findByID(id: string): Promise<User | undefined | null> {
    const user = await this.ormRepository.findOne({
      where: { _id: new ObjectID(id) },
    });

    return user;
  }

  public async findAll(): Promise<User[] | undefined | null> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async remove(username: string): Promise<void> {
    const userToBeDeleted = await this.ormRepository.findOne({
      where: { username },
    });
    if (userToBeDeleted) {
      await this.ormRepository.delete(userToBeDeleted?._id);
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

    await this.ormRepository.save(user);
    console.log(this.ormRepository);

    return user;
  }

  public async save(
    entity: User,
  ): Promise<User | PartialWithRequiredBy<User, '_id'>> {
    const user = await this.ormRepository.findOne({
      where: { _id: entity._id },
    });
    if (user) {
      await this.ormRepository.update(entity, {
        _id: user._id,
      });
      return user;
    } else {
      const newUser = await this.ormRepository.save(entity);
      return newUser;
    }
  }
}

export default UsersCadastro;
