import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PatientsController from '../controllers/PatientsController';


const patientsRouter = Router();
const patientsController = new PatientsController();

// chamar microsserviço
patientsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      birthDate: Joi.string().required(),
      phone: Joi.number().required(),
      susNumber: Joi.number().required(),
      sex: Joi.string().required(),
    },
  }),
  patientsController.create,
);

export default patientsRouter;
