import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDoctorsRepository from '@modules/users/repositories/IDoctorsRepository';
import AvailableTime from '../infra/database/schemas/AvailableTime';
import IAvailableTimesRepository from '../repositories/IAvailableTimesRepository';

@injectable()
class FindAvailableTimeServiceByDoctorService {
  constructor(
    @inject('AvailableTimesRepository')
    private availableTimesRepository: IAvailableTimesRepository,

    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  async execute({
    doctorName,
  }: {
    doctorName: string;
  }): Promise<AvailableTime[] | undefined | null> {
    const checkDoctorExists = await this.doctorsRepository.findByName(
      doctorName,
    );

    if (!checkDoctorExists) {
      throw new AppError('O médico não foi encontrado no sistema!');
    }

    const availableTimesByDoctor =
      await this.availableTimesRepository.findByDoctor({
        doctorName,
      });

    return availableTimesByDoctor;
  }
}

export default FindAvailableTimeServiceByDoctorService;
