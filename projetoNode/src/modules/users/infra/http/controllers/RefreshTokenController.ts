import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RefreshTokenService from '@modules/users/services/RefreshTokenService';

export default class RefreshTokenController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token } = req.body;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const tokenData = await refreshTokenService.execute({
      refresh_token: token,
    });

    return res.json(tokenData);
  }
}
