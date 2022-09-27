import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PatientsController from '../controllers/PatientsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ScheduledRequestsController from '../controllers/ScheduledRequestsController';

const scheduledRequestsRouter = Router();
const scheduledRequestsController = new ScheduledRequestsController();

// patientsRouter.use(ensureAuthenticated);
scheduledRequestsRouter.get('/', scheduledRequestsController.getAllFromMongo);

scheduledRequestsRouter.get(
  '/notifications',
  scheduledRequestsController.getAllFromMongoNotifications,
);

scheduledRequestsRouter.get(
  '/update_notifications',
  scheduledRequestsController.updateMongo,
);

scheduledRequestsRouter.get(
  '/retrieve_first',
  scheduledRequestsController.retrieveFirst,
);

scheduledRequestsRouter.post(
  '/confirm/:id',
  scheduledRequestsController.confirmRequest,
);

scheduledRequestsRouter.post(
  '/decline/:id',
  scheduledRequestsController.declineRequest,
);

export default scheduledRequestsRouter;
