import AvailableTime from '../infra/database/schemas/AvailableTime';
import ScheduledRequest from '../infra/database/schemas/ScheduledRequest';

export interface ICreateAvailableTimeData {
  dateLoopSlice: Date;
  doctorName: string;
  doctorId: string;
}

export interface IAssignPatientToAvailableTimeData {
  doctorId: string;
  patientName: string;
  patientId: string;
  dateLoopSlice: Date;
}

export default interface IAvailableTimesCadastro {
  create({
    dateLoopSlice,
    doctorName,
    doctorId,
  }: ICreateAvailableTimeData): Promise<AvailableTime>;

  assignPatient({
    doctorId,
    patientName,
    patientId,
    dateLoopSlice,
  }: IAssignPatientToAvailableTimeData): Promise<AvailableTime | undefined>;

  findByDoctor({
    doctorName,
  }: {
    doctorName: string;
  }): Promise<AvailableTime[] | undefined | null>;

  hasAvailableTime(
    scheduledRequest: ScheduledRequest,
  ): Promise<AvailableTime | undefined>;

  findAll(): Promise<AvailableTime[] | undefined | null>;
}
