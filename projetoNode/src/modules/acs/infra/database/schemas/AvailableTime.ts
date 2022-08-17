import { Collection } from 'fireorm';

@Collection('available_times')
class AvailableTime {
  id: string;

  availableTime: Date;

  doctorName: string;

  doctorId: string;

  scheduledPacientId: string | null;
}

export default AvailableTime;
