import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity('user_tokens')
class UserToken {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  user_id: string;

  @Column()
  refresh_token: string;

  @Column()
  expiresAt: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default UserToken;
