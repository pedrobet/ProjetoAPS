import { Router } from 'express';

import passwordsRouter from '@modules/users/infra/http/routes/passwords.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';
import refreshRouter from '@modules/users/infra/http/routes/refresh.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

import scheduledRequestsRouter from '@modules/acs/infra/http/routes/scheduledRequests.routes';
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/refresh', refreshRouter);
routes.use('/password', passwordsRouter);
routes.use('/profile', profilesRouter);
routes.use('/scheduledRequests', scheduledRequestsRouter);

export default routes;
