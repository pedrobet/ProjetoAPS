import Doctor from '@modules/users/infra/database/schemas/Doctor';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import Patient from './Patient';

@Entity('available_times')
class AvailableTime {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  availableTime: Date;

  @Column()
  doctorName: string;

  @Column()
  doctorId: string;

  @Column()
  patientName: string | null;

  @Column()
  patientId: string | null;
}

export default AvailableTime;
