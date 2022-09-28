import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users')
class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;
}

export default User;
