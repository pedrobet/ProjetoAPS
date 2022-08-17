import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PatientsController from '../controllers/PatientsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AvailableTimesController from '../controllers/AvailableTimesController';

const availableTimesRouter = Router();
const availableTimesController = new AvailableTimesController();

availableTimesRouter.use(ensureAuthenticated);

availableTimesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      doctorName: Joi.string().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
    },
  }),
  availableTimesController.create,
);

availableTimesRouter.get(
  '/',
  availableTimesController.findAll,
);

availableTimesRouter.get(
  '/get-by-doctor',
  celebrate({
    [Segments.BODY]: {
      doctorName: Joi.string().required(),
    },
  }),
  availableTimesController.findByDoctor,
);

export default availableTimesRouter;
