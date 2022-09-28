import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import DoctorsCadastro from '../../database/cadastros/DoctorsCadastro';
import AppError from '@shared/errors/AppError';

export default class DoctorsController {

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const doctorsCadastro = DoctorsCadastro.getInstance();
    const checkDoctorExists = await doctorsCadastro.findById(id);

    if (!checkDoctorExists) {
      throw new AppError('Médico não cadastrado no sistema!');
    }


    return res.json(instanceToInstance(checkDoctorExists));
  }

  public async findByName(req: Request, res: Response): Promise<Response> {
    const { name } = req.params;
    const doctorsCadastro = DoctorsCadastro.getInstance();
    const checkDoctorExists = await doctorsCadastro.findByName(name);

    if (!checkDoctorExists) {
      throw new AppError('Médico não cadastrado no sistema!');
    }

    return res.json(instanceToInstance(checkDoctorExists));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const doctorsCadastro = DoctorsCadastro.getInstance();
    const checkDoctorExists = await doctorsCadastro.findByName(name);

    if (checkDoctorExists) {
      throw new AppError('Médico já cadastrado no sistema!');
    }

    const doctor = await doctorsCadastro.create({
      name,
      email,
    });
    return res.json(instanceToInstance(doctor));
  }

  public async getDoctors(req: Request, res: Response): Promise<Response> {
    const doctorsCadastro = DoctorsCadastro.getInstance();
    const doctors = await doctorsCadastro.findAll();

    return res.json(instanceToInstance(doctors));
  }
}
