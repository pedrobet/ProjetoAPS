import IAvailableTimesCadastro from '@modules/acs/interfaces/IAvailableTimesCadastro';
import { ICreateAvailableTimeData } from '../../../interfaces/IAvailableTimesCadastro';

import { getRepository, IRepository } from 'fireorm';
import AvailableTime from '../schemas/AvailableTime';
import { getMongoRepository, MongoRepository } from 'typeorm';

class AvailableTimesCadastro implements IAvailableTimesCadastro {
  private ormRepository: MongoRepository<AvailableTime>;
  // implementação Singleton
  private static INSTANCE: AvailableTimesCadastro;

  constructor() {
    this.ormRepository = getMongoRepository(AvailableTime, 'mongo');
  }

  public static getInstance(): AvailableTimesCadastro {
    if (!AvailableTimesCadastro.INSTANCE) {
      AvailableTimesCadastro.INSTANCE = new AvailableTimesCadastro();
    }
    return AvailableTimesCadastro.INSTANCE;
  }

  public async findByDoctor({
    doctorName,
  }: {
    doctorName: string;
  }): Promise<AvailableTime[] | null | undefined> {
    const doctorsAvailableTimes = await this.ormRepository.find({
      where: { doctorName: doctorName },
    });

    return doctorsAvailableTimes;
  }

  public async findAll(): Promise<AvailableTime[] | null | undefined> {
    const allAvailableTimes = await this.ormRepository.find();
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

    await this.ormRepository.save(newAvailableTime);

    return newAvailableTime;
  }
}

export default AvailableTimesCadastro;
