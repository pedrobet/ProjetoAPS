import IScheduleRequestsCadastro from '@modules/acs/interfaces/IScheduledRequestsCadastro';
import { getRepository, IRepository } from 'fireorm';

import { getMongoRepository, MongoRepository } from 'typeorm';
import { AvailableTime } from '@modules/acs/interfaces/IScheduledRequestsCadastro';
import ScheduledRequest from '../schemas/ScheduledRequest';

import { subHours } from 'date-fns';
import { ObjectID } from 'mongodb';
import FirebaseScheduledRequest from '../schemas/FirebaseScheduledRequest';

import fetch from 'node-fetch'

class ScheduledRequestCadastro implements IScheduleRequestsCadastro {
  private ormRepository: MongoRepository<ScheduledRequest>;
  private fireormRepository: IRepository<FirebaseScheduledRequest>;
  private static INSTANCE: ScheduledRequestCadastro;

  constructor() {
    this.ormRepository = getMongoRepository(ScheduledRequest, 'mongo');
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
    const scheduleRequestsFormatted = scheduleRequests.map(
      async scheduleRequest => {
        const responsePatient = await fetch(
          `http://localhost:3334/patients/findById/${scheduleRequest.patient}`,
          {
            method: 'GET',
          },
        );
        const patient = await responsePatient.json();

        const responseDoctor = await fetch(
          `http://localhost:3335/doctors/findById/${scheduleRequest.doctor}`,
          {
            method: 'GET',
          },
        );
        const doctor = await responseDoctor.json();

        return {
          _id: scheduleRequest._id,
          id: scheduleRequest.id,
          consultTime: scheduleRequest.consultTime,
          doctor: doctor?.name,
          patient: patient?.name,
        };
      },
    );

    const scheduleRequestsFormattedResolved = await Promise.all(
      scheduleRequestsFormatted,
    );

    return scheduleRequestsFormattedResolved;
  }

  public async approveScheduledRequest(
    scheduleRequest: ScheduledRequest,
  ): Promise<AvailableTime | undefined> {
    const data = {
      availableTime: new Date(
        subHours(scheduleRequest.consultTime, 3).toUTCString(),
      ),
      doctorId: scheduleRequest.doctor,
    };

    const response = await fetch(
      `http://localhost:3336/timeslots/byDoctorAndDate`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    const availableTime = await response.json();

    if (availableTime) {
      const response = await fetch(
        `http://localhost:3336/patients/findById/${scheduleRequest.patient}`,
        {
          method: 'GET',
        },
      );
      const patient = await response.json();

      if (patient) {
        availableTime.patientId = patient?._id.toString();
        availableTime.patientName = patient?.name;
      }
      const data = {
        ...availableTime,
        patientId: patient?._id.toString(),
        patientName: patient?.name,
      };

      await fetch(`http://localhost:3336/timeslots/update`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      await this.ormRepository.remove(scheduleRequest);
    }

    return availableTime;
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
