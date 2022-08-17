import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPatientsRepository from '@modules/acs/repositories/IPatientsRepository';

import Patient from '@modules/acs/infra/database/schemas/Patient';
import ICreatePatientDTO from '../dtos/ICreatePatientDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('PatientsRepository')
    private patientsRepository: IPatientsRepository,
  ) {}

  async execute({
    name,
    phone,
    sex,
    susNumber,
    birthDate,
  }: ICreatePatientDTO): Promise<Patient | undefined | null> {
    const checkPatientExists = await this.patientsRepository.findBySusNumber(
      susNumber,
    );

    if (checkPatientExists) {
      throw new AppError('Paciente já esta cadastrado no sistema!');
    }

    const patient = await this.patientsRepository.create({
      name,
      phone,
      sex,
      susNumber,
      birthDate,
    });

    return patient;
  }
}

export default CreateUserService;
