import AvailableTime from '../infra/database/schemas/AvailableTime';

export interface ICreateAvailableTimeData {
  dateLoopSlice: Date;
  doctorName: string;
  doctorId: string;
}

export default interface IAvailableTimesRepository {
  create({
    dateLoopSlice,
    doctorName,
    doctorId,
  }: ICreateAvailableTimeData): Promise<AvailableTime>;

  findByDoctor({
    doctorName,
  }: {
    doctorName: string;
  }): Promise<AvailableTime[] | undefined | null>;

  findAll(): Promise<AvailableTime[] | undefined | null>;
}
