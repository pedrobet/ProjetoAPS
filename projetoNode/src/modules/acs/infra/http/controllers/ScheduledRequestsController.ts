import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import PatientsCadastro from '../../database/cadastros/PatientsCadastro';
import AppError from '@shared/errors/AppError';
import ScheduledRequestCadastro from '../../database/cadastros/ScheduleRequestCadastro';
import DoctorsCadastro from '@modules/users/infra/database/cadastros/DoctorsCadastro';

export default class ScheduledRequestsController {
  public async getAllFromMongo(req: Request, res: Response): Promise<Response> {
    try {
      const scheduledRequestCadastro = ScheduledRequestCadastro.getInstance();
      const allScheduled =
        await scheduledRequestCadastro.getAllScheduleRequestFromMongo();

      if (!allScheduled) {
        throw new AppError('No scheduled requests found', 404);
      }
      return res.status(200).json(allScheduled);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  public async getAllFromMongoNotifications(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const scheduledRequestCadastro = ScheduledRequestCadastro.getInstance();
      const allScheduled =
        await scheduledRequestCadastro.getAllScheduleRequestAwaitingToApprove();

      if (!allScheduled) {
        throw new AppError('No scheduled requests found', 404);
      }
      return res.status(200).json(allScheduled.length);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  public async updateMongo(req: Request, res: Response): Promise<Response> {
    try {
      const scheduledRequestCadastro = ScheduledRequestCadastro.getInstance();

      await scheduledRequestCadastro.updateMongoScheduleRequests();

      return res.status(200).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  public async retrieveFirst(req: Request, res: Response): Promise<Response> {
    try {
      const scheduledRequestCadastro = ScheduledRequestCadastro.getInstance();

      const getFirst =
        await scheduledRequestCadastro.getAllScheduleRequestAwaitingToApprove();

      if (getFirst.length === 0) {
        return res.status(200).json(null);
      }

      const patientsCadastro = PatientsCadastro.getInstance();
      const doctorsCadastro = DoctorsCadastro.getInstance();

      const patient = await patientsCadastro.findById(getFirst[0].patient);
      const doctor = await doctorsCadastro.findById(getFirst[0].doctor);

      const scheduleRequest = {
        _id: getFirst[0]._id,
        id: getFirst[0].id,
        consultTime: getFirst[0].consultTime,
        doctor: instanceToInstance(doctor),
        patient: instanceToInstance(patient),
      };

      return res.status(200).json(scheduleRequest);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  public async confirmRequest(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const scheduledRequestCadastro = ScheduledRequestCadastro.getInstance();

      const scheduleRequest = await scheduledRequestCadastro.findById(id);

      if (!scheduleRequest) {
        throw new AppError('No scheduled requests found', 404);
      }

      const confirmedScheduledRequest =
        scheduledRequestCadastro.approveScheduledRequest(scheduleRequest);

      if (!confirmedScheduledRequest) {
        throw new AppError('Error confirming scheduled request', 500);
      }

      return res.status(200).json(confirmedScheduledRequest);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  public async declineRequest(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const scheduledRequestCadastro = ScheduledRequestCadastro.getInstance();

      const scheduleRequest = await scheduledRequestCadastro.findById(id);

      if (!scheduleRequest) {
        throw new AppError('No scheduled requests found', 404);
      }

      const reprovedScheduledRequest =
        scheduledRequestCadastro.reproveScheduledRequest(scheduleRequest);

      if (!reprovedScheduledRequest) {
        throw new AppError('Error reproving scheduled request', 500);
      }

      return res.status(200).json(null);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}
