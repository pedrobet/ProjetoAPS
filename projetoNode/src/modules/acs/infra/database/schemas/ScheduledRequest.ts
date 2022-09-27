import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('scheduledRequests')
class ScheduledRequest {
  @ObjectIdColumn()
  _id: ObjectID;

  // firebase object id
  @Column()
  id: string;

  // patient id
  @Column()
  patient: string;

  @Column()
  consultTime: Date;

  // doctor id
  @Column()
  doctor: string;

  // confirmation
  @Column()
  confirmed: boolean;
}

export default ScheduledRequest;
