import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/database/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/database/repositories/UserTokensRepository';

import IPatientsRepository from '@modules/acs/repositories/IPatientsRepository';
import PatientsRepository from '@modules/acs/infra/database/repositories/PatientsRepository';

import IDoctorsRepository from '@modules/users/repositories/IDoctorsRepository';
import DoctorsRepository from '@modules/users/infra/database/repositories/DoctorsRepository';

import IAvailableTimesRepository from '@modules/acs/repositories/IAvailableTimesRepository';
import AvailableTimesRepository from '@modules/acs/infra/database/repositories/AvailableTimesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IPatientsRepository>(
  'PatientsRepository',
  PatientsRepository,
);

container.registerSingleton<IDoctorsRepository>(
  'DoctorsRepository',
  DoctorsRepository,
);

container.registerSingleton<IAvailableTimesRepository>(
  'AvailableTimesRepository',
  AvailableTimesRepository,
);
