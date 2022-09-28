import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DoctorsController from '@modules/users/infra/http/controllers/DoctorsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const doctorsRouter = Router();
const doctorsController = new DoctorsController();


doctorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  doctorsController.create,
);

doctorsRouter.get(
  '/',
  doctorsController.getDoctors,
);


export default doctorsRouter;
