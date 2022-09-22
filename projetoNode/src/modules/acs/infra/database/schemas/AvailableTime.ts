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
  scheduledPacientId: string | null;
}

export default AvailableTime;
