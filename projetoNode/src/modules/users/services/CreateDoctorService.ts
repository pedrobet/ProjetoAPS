import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDoctorsRepository, {
  ICreateDoctorData,
} from '../repositories/IDoctorsRepository';
import Doctor from '../infra/database/schemas/Doctor';

@injectable()
class CreateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  async execute({
    name,
    email,
  }: ICreateDoctorData): Promise<Doctor | undefined | null> {
    const checkDoctorExists = await this.doctorsRepository.findByName(name);

    if (checkDoctorExists) {
      throw new AppError('Médico já cadastrado no sistema!');
    }

    const doctor = await this.doctorsRepository.create({
      name,
      email,
    });

    return doctor;
  }
}

export default CreateDoctorService;
