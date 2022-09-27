import IScheduleRequestsCadastro from '@modules/acs/interfaces/IScheduledRequestsCadastro';
import { getRepository, IRepository } from 'fireorm';

import { getMongoRepository, MongoRepository } from 'typeorm';
import AvailableTime from '../schemas/AvailableTime';
import ScheduledRequest from '../schemas/scheduledRequest';

import FirebaseScheduledRequest from '../schemas/FirebaseScheduledRequest';
import { ObjectID } from 'mongodb';
import PatientsCadastro from './PatientsCadastro';
import DoctorsCadastro from '@modules/users/infra/database/cadastros/DoctorsCadastro';

class ScheduledRequestCadastro implements IScheduleRequestsCadastro {
  private ormRepository: MongoRepository<ScheduledRequest>;
  private fireormRepository: IRepository<FirebaseScheduledRequest>;
  private availableTimesRepository: MongoRepository<AvailableTime>;
  private static INSTANCE: ScheduledRequestCadastro;

  constructor() {
    this.ormRepository = getMongoRepository('scheduledRequests', 'mongo');
    this.availableTimesRepository = getMongoRepository(AvailableTime, 'mongo');
    this.fireormRepository = getRepository(FirebaseScheduledRequest);
  }

  public static getInstance(): ScheduledRequestCadastro {
    if (!ScheduledRequestCadastro.INSTANCE) {
      ScheduledRequestCadastro.INSTANCE = new ScheduledRequestCadastro();
    }
    return ScheduledRequestCadastro.INSTANCE;
  }

  public async updateMongoScheduleRequests(): Promise<void> {
    const firebaseScheduleRequests = await this.fireormRepository.find();

    if (firebaseScheduleRequests.length > 0) {
      const newMongoScheduleRequest = firebaseScheduleRequests.map(
        firebaseElement => ({
          _id: new ObjectID(),
          id: firebaseElement.id,
          consultTime: firebaseElement.consultTime,
          doctor: firebaseElement.doctor,
          patient: firebaseElement.patient,
          confirmed: false,
        }),
      );

      await this.ormRepository.save(newMongoScheduleRequest);
      //delete from firebase
      firebaseScheduleRequests.forEach(async firebaseElement => {
        await this.fireormRepository.delete(firebaseElement.id);
      });
    }
  }

  public async saveNewScheduledRequestToMongo(
    scheduleRequest: ScheduledRequest,
  ): Promise<ScheduledRequest> {
    const newScheduledRequest = await this.ormRepository.save(scheduleRequest);
    return newScheduledRequest;
  }

  public async getAllScheduleRequestFromMongo(): Promise<
    {
      _id: ObjectID;
      id: string;
      consultTime: Date;
      doctor: string | undefined;
      patient: string | undefined;
    }[]
  > {
    const scheduleRequests = await this.ormRepository.find();
    const scheduleRequestsFormatted =scheduleRequests.map(
      async (scheduleRequest) => {
        const patient = await PatientsCadastro.getInstance().findById(
          scheduleRequest.patient
        );
        const doctor = await DoctorsCadastro.getInstance().findById(
          scheduleRequest.doctor
        );

        return {
          _id: scheduleRequest._id,
          id: scheduleRequest.id,
          consultTime: scheduleRequest.consultTime,
          doctor: doctor?.name,
          patient: patient?.name,
          confirmed: scheduleRequest.confirmed,
        };
      }
    );

    const scheduleRequestsFormattedResolved = await Promise.all(
      scheduleRequestsFormatted
    );

    return scheduleRequestsFormattedResolved;
  }

  public async getAllScheduleRequestAwaitingToApprove(): Promise<
    {
      _id: ObjectID;
      id: string;
      consultTime: Date;
      doctor: string;
      patient: string;
    }[]
  > {
    const scheduleRequests = await this.ormRepository.find({
      where: { confirmed: false },
    });

    return scheduleRequests;
  }

  public async approveScheduledRequest(
    scheduleRequest: ScheduledRequest,
  ): Promise<ScheduledRequest | undefined> {
    const availableTime = await this.availableTimesRepository.findOne({
      where: {
        availableTime: new Date(scheduleRequest.consultTime),
        doctorId: scheduleRequest.doctor,
      },
    });

    if (availableTime) {
      await this.availableTimesRepository.remove(availableTime);
    }

    const updatedScheduleRequest = await this.ormRepository.save({
      ...scheduleRequest,
      confirmed: true,
    });

    return updatedScheduleRequest;
  }

  public async reproveScheduledRequest(
    scheduleRequest: ScheduledRequest,
  ): Promise<ScheduledRequest | undefined> {
    const removedScheduledRequest = await this.ormRepository.remove(
      scheduleRequest,
    );

    return removedScheduledRequest;
  }

  public async removeScheduledRequest(
    scheduleRequest: ScheduledRequest,
  ): Promise<ScheduledRequest | undefined> {
    const removedScheduledRequest = await this.ormRepository.remove(
      scheduleRequest,
    );
    return removedScheduledRequest;
  }

  public async removeScheduledRequestFromFirebase(
    firebaseScheduleRequest: FirebaseScheduledRequest,
  ): Promise<FirebaseScheduledRequest | undefined> {
    await this.fireormRepository.delete(firebaseScheduleRequest.id);
    return firebaseScheduleRequest;
  }

  public async findById(id: string): Promise<ScheduledRequest | undefined> {
    const scheduleRequest = await this.ormRepository.findOne({
      where: {
        _id: new ObjectID(id),
      },
    });
    return scheduleRequest;
  }
}

export default ScheduledRequestCadastro;
