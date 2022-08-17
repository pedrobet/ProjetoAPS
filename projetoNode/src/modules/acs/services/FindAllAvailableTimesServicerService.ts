import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDoctorsRepository from '@modules/users/repositories/IDoctorsRepository';
import AvailableTime from '../infra/database/schemas/AvailableTime';
import IAvailableTimesRepository from '../repositories/IAvailableTimesRepository';

@injectable()
class FindAllAvailableTimesServiceService {
  constructor(
    @inject('AvailableTimesRepository')
    private availableTimesRepository: IAvailableTimesRepository,

    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  async execute(): Promise<AvailableTime[] | undefined | null> {
    const allAvailableTimes = await this.availableTimesRepository.findAll();

    return allAvailableTimes;
  }
}

export default FindAllAvailableTimesServiceService;
