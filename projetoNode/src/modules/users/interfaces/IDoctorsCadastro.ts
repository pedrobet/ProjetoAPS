import Doctor from '@modules/users/infra/database/schemas/Doctor';
import { PartialWithRequiredBy } from 'fireorm';

export interface ICreateDoctorData {
  email: string;
  name: string;
}

export default interface IDoctorsCadastro {
  findByName(name: string): Promise<Doctor | undefined | null>;
  findByEmail(email: string): Promise<Doctor | undefined | null>;
  create(data: ICreateDoctorData): Promise<Doctor>;
}
