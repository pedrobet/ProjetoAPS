import { Collection } from 'fireorm';

@Collection('user_tokens')
class UserToken {
  id: string;

  user_id: string;

  refresh_token: string;

  expiresAt: Date;

  created_at: Date;

  updated_at: Date;
}

export default UserToken;
