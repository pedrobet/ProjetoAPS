import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import CreatePatientService from '@modules/acs/services/CreatePatientService';
import CreateAvailableTimeService from '@modules/acs/services/CreateAvailableTimeService';
import FindAvailableTimeServiceByDoctorService from '@modules/acs/services/FindAvailableTimeServiceByDoctorService';
import FindAllAvailableTimesServiceService from '@modules/acs/services/FindAllAvailableTimesServicerService';

export default class AvailableTimesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { doctorName, startDate, endDate } = req.body;

    const createAvailableTime = container.resolve(CreateAvailableTimeService);

    const newAvailableTime = await createAvailableTime.execute({
      doctorName,
      startDate,
      endDate,
    });

    return res.json(instanceToInstance(newAvailableTime));
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const findAvailableTimesByDoctorService = container.resolve(
      FindAllAvailableTimesServiceService,
    );

    const doctorsAvailableTimes =
      await findAvailableTimesByDoctorService.execute();

    return res.json(instanceToInstance(doctorsAvailableTimes));
  }

  public async findByDoctor(req: Request, res: Response): Promise<Response> {
    const { doctorName } = req.body;

    const findAvailableTimesByDoctorService = container.resolve(
      FindAvailableTimeServiceByDoctorService,
    );

    const doctorsAvailableTimes =
      await findAvailableTimesByDoctorService.execute({
        doctorName,
      });

    return res.json(instanceToInstance(doctorsAvailableTimes));
  }
}
