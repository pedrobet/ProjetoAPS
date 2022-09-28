import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AvailableTimesController from '../controllers/AvailableTimesController';

const availableTimesRouter = Router();
const availableTimesController = new AvailableTimesController();

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

availableTimesRouter.get('/', availableTimesController.findAll);

availableTimesRouter.get(
  '/get-by-doctor',
  celebrate({
    [Segments.BODY]: {
      doctorName: Joi.string().required(),
    },
  }),
  availableTimesController.findByDoctor,
);

availableTimesRouter.get(
  '/byDoctorAndDate',
  availableTimesController.findByDoctorAndDate,
);

availableTimesRouter.put(
  '/byDoctorAndDate',
  availableTimesController.findByDoctorAndDate,
);

availableTimesRouter.put(
  '/update',
  availableTimesController.update,
);

export default availableTimesRouter;
