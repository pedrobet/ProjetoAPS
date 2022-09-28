import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

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
