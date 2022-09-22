import { hash, compare } from 'bcryptjs';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  private static INSTANCE: BCryptHashProvider;

  public static getInstance(): BCryptHashProvider {
    if (!BCryptHashProvider.INSTANCE) {
      BCryptHashProvider.INSTANCE = new BCryptHashProvider();
    }
    return BCryptHashProvider.INSTANCE;
  }

  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async comapreHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
