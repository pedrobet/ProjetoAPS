import { Collection } from 'fireorm';

@Collection('scheduled_requests')
class FirebaseScheduledRequest {
  id: string;

  patient: string;

  consultTime: Date;

  doctor: string;
}

export default FirebaseScheduledRequest;
