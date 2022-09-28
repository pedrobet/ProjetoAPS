import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

import ScheduledRequestCadastro from '../../database/cadastros/ScheduleRequestCadastro';

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
        await scheduledRequestCadastro.getAllScheduleRequestFromMongo();

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
        await scheduledRequestCadastro.getAllScheduleRequestFromMongo();

      if (getFirst.length === 0) {
        return res.status(200).json(null);
      }

      return res.status(200).json(getFirst[0]);
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

      const data = {
        doctorId: scheduleRequest.doctor,
        availableTime: scheduleRequest.consultTime,
      };

      const response = await fetch(
        `http://localhost:3336/timeslots/hasAvailableTimeSlot`,
        {
          method: 'POST',
          body: JSON.stringify(data),
        },
      );
      const hasAvailableTime = await response.json();

      if (!hasAvailableTime) {
        throw new AppError('No available time found', 404);
      }

      const confirmedScheduledRequest =
        scheduledRequestCadastro.approveScheduledRequest(scheduleRequest);

      if (!confirmedScheduledRequest) {
        throw new AppError('Error confirming scheduled request', 500);
      }

      //check if has next scheduledRequest

      const getFirst =
        await scheduledRequestCadastro.getAllScheduleRequestFromMongo();

      if (getFirst.length === 0) {
        return res.status(200).json(null);
      }

      return res.status(200).json(getFirst[0]);
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
