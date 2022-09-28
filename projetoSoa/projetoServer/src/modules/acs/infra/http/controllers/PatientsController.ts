import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import PatientsCadastro from '../../database/cadastros/PatientsCadastro';
import AppError from '@shared/errors/AppError';

export default class PatientsController {
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
