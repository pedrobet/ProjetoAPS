import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('patients')
class Patient {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Column()
  phone: number;

  @Column()
  susNumber: number;

  @Column()
  sex: string;
}

export default Patient;
