import IAvailableTimesRepository from '@modules/acs/repositories/IAvailableTimesRepository';
import { ICreateAvailableTimeData } from './../../../repositories/IAvailableTimesRepository';

import { getRepository, IRepository } from 'fireorm';
import AvailableTime from '../schemas/AvailableTime';

class availableTimesRepository implements IAvailableTimesRepository {
  private fireOrm: IRepository<AvailableTime>;

  constructor() {
    this.fireOrm = getRepository(AvailableTime);
  }
  public async findByDoctor({
    doctorName,
  }: {
    doctorName: string;
  }): Promise<AvailableTime[] | null | undefined> {
    const doctorsAvailableTimes = await this.fireOrm
      .whereEqualTo('doctorName', doctorName)
      .find();

    return doctorsAvailableTimes;
  }

  public async findAll(): Promise<AvailableTime[] | null | undefined> {
    const allAvailableTimes = await this.fireOrm.find();
    return allAvailableTimes;
  }

  public async create({
    dateLoopSlice,
    doctorName,
    doctorId,
  }: ICreateAvailableTimeData): Promise<AvailableTime> {
    const newAvailableTime = new AvailableTime();
    newAvailableTime.availableTime = dateLoopSlice;
    newAvailableTime.doctorName = doctorName;
    newAvailableTime.doctorId = doctorId;
    newAvailableTime.scheduledPacientId = null;

    await this.fireOrm.create(newAvailableTime);

    return newAvailableTime;
  }
}

export default availableTimesRepository;
