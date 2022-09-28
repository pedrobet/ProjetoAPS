import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import DoctorsController from '../controllers/DoctorsController';
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

doctorsRouter.get('/', doctorsController.getDoctors);

export default doctorsRouter;
