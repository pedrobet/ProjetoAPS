import { Collection } from 'fireorm';

@Collection('patients')
class Patient {
  id: string;

  name: string;

  birthDate: Date;

  phone: number;

  susNumber: number;

  sex: string;
}

export default Patient;
