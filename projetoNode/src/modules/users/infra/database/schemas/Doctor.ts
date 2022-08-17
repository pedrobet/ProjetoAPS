import { Collection } from 'fireorm';

@Collection('doctors')
class Doctor {
  id: string;

  name: string;

  email: string;
}

export default Doctor;
