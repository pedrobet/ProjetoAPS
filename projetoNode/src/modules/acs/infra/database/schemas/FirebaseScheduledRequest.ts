import Doctor from '@modules/users/infra/database/schemas/Doctor';
import { Collection } from 'fireorm';
import Patient from './Patient';

@Collection('scheduled_requests')
class FirebaseScheduledRequest{
  id: string;

  patient: string;

  consultTime: Date;

  doctor: string;
}

export default FirebaseScheduledRequest;
