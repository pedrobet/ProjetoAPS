import AvailableTime from '../infra/database/schemas/AvailableTime';
import ScheduledRequest from '../infra/database/schemas/ScheduledRequest';
import FirebaseScheduledRequest from '../infra/database/schemas/FirebaseScheduledRequest';
import { ObjectID } from 'mongodb';

export default interface IScheduleRequestsCadastro {
  saveNewScheduledRequestToMongo: (
    scheduleRequest: ScheduledRequest,
  ) => Promise<ScheduledRequest | undefined>;
  getAllScheduleRequestFromMongo: () => Promise<
    {
      _id: ObjectID;
      id: string;
      consultTime: Date;
      doctor: string | undefined;
      patient: string | undefined;
    }[]
  >;

  removeScheduledRequestFromFirebase: (
    firebaseScheduleRequest: FirebaseScheduledRequest,
  ) => Promise<FirebaseScheduledRequest | undefined>;
  approveScheduledRequest: (
    scheduleRequest: ScheduledRequest,
  ) => Promise<AvailableTime | undefined>;
  reproveScheduledRequest: (
    scheduleRequest: ScheduledRequest,
  ) => Promise<ScheduledRequest | undefined>;
  updateMongoScheduleRequests: () => Promise<void>;
  findById: (id: string) => Promise<ScheduledRequest | undefined>;
}
