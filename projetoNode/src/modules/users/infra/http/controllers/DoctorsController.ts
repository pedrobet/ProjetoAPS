import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateDoctorService from '@modules/users/services/CreateDoctorService';

export default class DoctorsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const createDoctorService = container.resolve(CreateDoctorService);
    const doctor = await createDoctorService.execute({ name, email });

    return res.json(instanceToInstance(doctor));
  }
}
