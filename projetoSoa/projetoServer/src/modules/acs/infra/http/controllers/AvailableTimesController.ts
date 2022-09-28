import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import DoctorsCadastro from '@modules/users/infra/database/cadastros/DoctorsCadastro';
import AppError from '@shared/errors/AppError';
import { subHours } from 'date-fns';
import AvailableTimesCadastro from '../../database/cadastros/AvailableTimesCadastro';
import AvailableTime from '../../database/schemas/AvailableTime';

export default class AvailableTimesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { doctorName, startDate, endDate } = req.body;

    const doctorsCadastro = DoctorsCadastro.getInstance();
    const availableTimeCadastro = AvailableTimesCadastro.getInstance();

    const parsedStartDate = new Date(subHours(new Date(startDate), 3));
    const parsedEndDate = new Date(subHours(new Date(endDate), 3));
    const checkDoctorExists = await doctorsCadastro.findByName(doctorName);

    if (!checkDoctorExists) {
      throw new AppError('O médico não foi encontrado no sistema!');
    }

    let dateLoop = parsedStartDate;
    const availableTimesByDoctor: AvailableTime[] = [];
    while (dateLoop <= parsedEndDate) {
      const availableTime = await availableTimeCadastro.create({
        dateLoopSlice: dateLoop,
        doctorName,
        doctorId: checkDoctorExists._id.toString(),
      });

      availableTimesByDoctor.push(availableTime);
      dateLoop = new Date(dateLoop.setHours(dateLoop.getHours() + 1));
    }

    return res.json(instanceToInstance(availableTimesByDoctor));
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const availabelTimesCadastro = AvailableTimesCadastro.getInstance();

    const allAvailableTimes = await availabelTimesCadastro.findAll();

    return res.json(instanceToInstance(allAvailableTimes));
  }

  public async findByDoctor(req: Request, res: Response): Promise<Response> {
    const { doctorName } = req.body;

    const doctorsCadastro = DoctorsCadastro.getInstance();
    const availableTimeCadastro = AvailableTimesCadastro.getInstance();

    const checkDoctorExists = await doctorsCadastro.findByName(doctorName);

    if (!checkDoctorExists) {
      throw new AppError('O médico não foi encontrado no sistema!');
    }

    const availableTimesByDoctor = await availableTimeCadastro.findByDoctor({
      doctorName,
    });

    return res.json(instanceToInstance(availableTimesByDoctor));
  }
}
