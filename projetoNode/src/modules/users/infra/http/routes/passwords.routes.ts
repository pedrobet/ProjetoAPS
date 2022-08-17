import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const passwordsRouter = Router();
const resetPasswordController = new ResetPasswordController();

passwordsRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordsRouter;
