import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import CreatePatientService from '@modules/acs/services/CreatePatientService';

export default class PatientsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, phone, sex, susNumber, birthDate } = req.body;

    const parsedBirthDate = new Date(birthDate);

    const createPatient = container.resolve(CreatePatientService);

    const patient = await createPatient.execute({
      name,
      phone,
      sex,
      susNumber,
      birthDate: parsedBirthDate,
    });

    return res.json(instanceToInstance(patient));
  }
}
