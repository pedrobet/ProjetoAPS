import Patient from '@modules/acs/infra/database/schemas/Patient';

import IPatientsCadastro, {
  ICreatePatientData,
} from '@modules/acs/interfaces/IPatientsCadastro';

import { getRepository, IRepository } from 'fireorm';
import { ObjectID } from 'mongodb';
import { getMongoRepository, MongoRepository } from 'typeorm';

class PatientsCadastro implements IPatientsCadastro {
  private ormRepository: MongoRepository<Patient>;
  //implementação singleton
  private static INSTANCE: PatientsCadastro;

  constructor() {
    this.ormRepository = getMongoRepository(Patient, 'mongo');
  }

  public static getInstance(): PatientsCadastro {
    if (!PatientsCadastro.INSTANCE) {
      PatientsCadastro.INSTANCE = new PatientsCadastro();
    }
    return PatientsCadastro.INSTANCE;
  }

  public async findByName(name: string): Promise<Patient | undefined | null> {
    const patient = await this.ormRepository.findOne({ where: { name: name } });
    return patient;
  }

  public async findById(id: string): Promise<Patient | null | undefined> {
    const patient = await this.ormRepository.findOne({
      where: { _id: new ObjectID(id) },
    });

    return patient;
  }

  public async findBySusNumber(
    susNumber: number,
  ): Promise<Patient | undefined | null> {
    const patient = await this.ormRepository.findOne({
      where: { susNumber: susNumber },
    });
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

    await this.ormRepository.save(patient);

    return patient;
  }
}

export default PatientsCadastro;
