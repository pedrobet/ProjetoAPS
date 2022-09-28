import { Router } from 'express';

import ScheduledRequestsController from '../controllers/ScheduledRequestsController';

const scheduledRequestsRouter = Router();
const scheduledRequestsController = new ScheduledRequestsController();

scheduledRequestsRouter.get('/', scheduledRequestsController.getAllFromMongo);

scheduledRequestsRouter.get(
  '/retrieve_first',
  scheduledRequestsController.retrieveFirst,
);

scheduledRequestsRouter.get(
  '/notifications',
  scheduledRequestsController.getAllFromMongoNotifications,
);

scheduledRequestsRouter.get(
  '/update_notifications',
  scheduledRequestsController.updateMongo,
);

scheduledRequestsRouter.post(
  '/confirm/:id',
  scheduledRequestsController.confirmRequest,
);

export default scheduledRequestsRouter;
