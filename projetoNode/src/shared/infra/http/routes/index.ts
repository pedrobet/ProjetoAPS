import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordsRouter from '@modules/users/infra/http/routes/passwords.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';
import refreshRouter from '@modules/users/infra/http/routes/refresh.routes';

import doctorsRouter from '@modules/users/infra/http/routes/doctors.routes';
import patientsRouter from '@modules/acs/infra/http/routes/patients.routes';

import availableTimesRouter from '@modules/acs/infra/http/routes/availableTimes.routes';
import scheduledRequestsRouter from '@modules/acs/infra/http/routes/scheduledRequests.routes';
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/refresh', refreshRouter);
routes.use('/password', passwordsRouter);
routes.use('/profile', profilesRouter);
routes.use('/doctors', doctorsRouter);
routes.use('/patients', patientsRouter);
routes.use('/availableTimes', availableTimesRouter);
routes.use('/scheduledRequests', scheduledRequestsRouter);

routes.use('/patients', patientsRouter);
export default routes;
