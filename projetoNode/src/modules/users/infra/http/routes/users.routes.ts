import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

// usersRouter.use(ensureAuthenticated);

usersRouter.get(
  '/get/:username',
  celebrate({
    [Segments.PARAMS]: {
      username: Joi.string().required(),
    },
  }),
  usersController.getUser,
);

usersRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  usersController.update,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      role: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.get(
  '/get-by-role/:role',
  celebrate({
    [Segments.PARAMS]: {
      role: Joi.string().required(),
    },
  }),
  usersController.showAll,
);

usersRouter.delete('/:username', usersController.delete);

export default usersRouter;
