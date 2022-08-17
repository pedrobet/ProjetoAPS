import { Collection } from 'fireorm';

@Collection('users')
class User {
  id: string;

  username: string;

  name: string;

  email: string;

  role: 'admin' | 'acs';

  password: string;
}

export default User;
