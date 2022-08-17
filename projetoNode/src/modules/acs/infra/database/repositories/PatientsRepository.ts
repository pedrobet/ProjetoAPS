import Patient from '@modules/acs/infra/database/schemas/Patient';

import IPatientsRepository, {
  ICreatePatientData,
} from '@modules/acs/repositories/IPatientsRepository';

import { getRepository, IRepository } from 'fireorm';

class patientsRepository implements IPatientsRepository {
  private fireOrm: IRepository<Patient>;

  constructor() {
    this.fireOrm = getRepository(Patient);
  }

  public async findByName(name: string): Promise<Patient | undefined | null> {
    const patient = await this.fireOrm.whereEqualTo('name', name).findOne();
    return patient;
  }

  public async findBySusNumber(
    susNumber: number,
  ): Promise<Patient | undefined | null> {
    const patient = await this.fireOrm
      .whereEqualTo('susNumber', susNumber)
      .findOne();
    return patient;
  }

  public async create({
    name,
    birthDate,
    phone,
    sex,
    susNumber,
  }: ICreatePatientData): Promise<Patient> {
    const patient = new Patient();
    patient.name = name;
    patient.birthDate = birthDate;
    patient.phone = phone;
    patient.sex = sex;
    patient.susNumber = susNumber;

    await this.fireOrm.create(patient);

    return patient;
  }
}

export default patientsRepository;
