import { inject, injectable } from 'tsyringe';
import { subHours } from 'date-fns';
import AppError from '@shared/errors/AppError';

import IDoctorsRepository from '@modules/users/repositories/IDoctorsRepository';
import AvailableTime from '../infra/database/schemas/AvailableTime';
import IAvailableTimesRepository from '../repositories/IAvailableTimesRepository';

@injectable()
class CreateAvailableTimeService {
  constructor(
    @inject('AvailableTimesRepository')
    private availableTimesRepository: IAvailableTimesRepository,

    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  async execute({
    startDate,
    endDate,
    doctorName,
  }: {
    startDate: string;
    endDate: string;
    doctorName: string;
  }): Promise<AvailableTime[] | undefined | null> {
    const parsedStartDate = new Date(subHours(new Date(startDate), 3));
    const parsedEndDate = new Date(subHours(new Date(endDate), 3));
    const checkDoctorExists = await this.doctorsRepository.findByName(
      doctorName,
    );

    if (!checkDoctorExists) {
      throw new AppError('O médico não foi encontrado no sistema!');
    }

    let dateLoop = parsedStartDate;
    const availableTimesByDoctor: AvailableTime[] = [];
    while (dateLoop <= parsedEndDate) {
      const availableTime = await this.availableTimesRepository.create({
        dateLoopSlice: dateLoop,
        doctorName,
        doctorId: checkDoctorExists.id,
      });

      availableTimesByDoctor.push(availableTime);
      dateLoop = new Date(dateLoop.setHours(dateLoop.getHours() + 1));
    }

    return availableTimesByDoctor;
  }
}

export default CreateAvailableTimeService;
