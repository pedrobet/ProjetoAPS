import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import PatientsCadastro from '../../database/cadastros/PatientsCadastro';

export default class PatientsController {
  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const patientsCadastro = PatientsCadastro.getInstance();

    const checkPatientExists = await patientsCadastro.findById(id);

    if (!checkPatientExists) {
      throw new AppError('Paciente não esta cadastrado no sistema!');
    }

    return res.json(instanceToInstance(checkPatientExists));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, phone, sex, susNumber, birthDate } = req.body;

    const patientsCadastro = PatientsCadastro.getInstance();

    const parsedBirthDate = new Date(birthDate);

    const checkPatientExists = await patientsCadastro.findBySusNumber(
      susNumber,
    );

    if (checkPatientExists) {
      throw new AppError('Paciente já esta cadastrado no sistema!');
    }

    const patient = await patientsCadastro.create({
      name,
      phone,
      sex,
      susNumber,
      birthDate: parsedBirthDate,
    });

    return res.json(instanceToInstance(patient));
  }
}
