import IAvailableTimesCadastro, {
  IAssignPatientToAvailableTimeData,
  ICreateAvailableTimeData,
} from '../../../interfaces/IAvailableTimesCadastro';

import { subHours } from 'date-fns';
import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';
import AvailableTime from '../schemas/AvailableTime';

import { ScheduledRequest } from '../../../interfaces/IAvailableTimesCadastro';

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

  public async findByDoctorAndDate({
    doctorId,
    availableTime,
  }: {
    doctorId: string;
    availableTime: Date;
  }): Promise<AvailableTime[] | null | undefined> {
    const doctorsAvailableTimes = await this.ormRepository.find({
      where: { doctorId: new ObjectID(doctorId), availableTime: availableTime },
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
    newAvailableTime.patientName = null;
    newAvailableTime.patientId = null;

    await this.ormRepository.save(newAvailableTime);

    return newAvailableTime;
  }

  public async hasAvailableTime(
    scheduledRequest: ScheduledRequest,
  ): Promise<AvailableTime | undefined> {
    const availableTime = await this.ormRepository.findOne({
      where: {
        doctorId: scheduledRequest.doctor,
        availableTime: new Date(
          subHours(scheduledRequest.consultTime, 3).toUTCString(),
        ),
      },
    });

    return availableTime;
  }

  public async assignPatient({
    doctorId,
    dateLoopSlice,
    patientName,
    patientId,
  }: IAssignPatientToAvailableTimeData): Promise<AvailableTime | undefined> {
    const availableTime = await this.ormRepository.findOne({
      where: {
        doctorId: doctorId,
        patientName: null,
        availableTime: dateLoopSlice,
      },
    });

    if (availableTime) {
      availableTime.patientName = patientName;
      availableTime.patientId = patientId;

      await this.ormRepository.save(availableTime);
    }

    return availableTime;
  }
}

export default AvailableTimesCadastro;
