import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RefreshTokenController from '../controllers/RefreshTokenController';

const refreshRouter = Router();
const refreshTokenController = new RefreshTokenController();

refreshRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
    },
  }),
  refreshTokenController.create,
);

export default refreshRouter;
