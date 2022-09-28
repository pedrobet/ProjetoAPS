import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('doctors')
class Doctor {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;
  
  @Column()
  email: string;
}

export default Doctor;
