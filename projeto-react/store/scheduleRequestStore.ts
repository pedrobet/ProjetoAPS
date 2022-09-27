import create from "zustand";

interface Doctor {
  _id: string;
  name: string;
  email: string;
}

interface Patient {
  _id: string;
  name: string;
  birthDate: Date;
  phone: number;
  sex: string;
  susNumber: number;
}

interface ScheduleRequest {
  _id: string;
  id: string;
  doctor: Doctor;
  patient: Patient;
  consultTime: Date;
}

type ScheduleRequestState = {
  scheduleRequest: ScheduleRequest | null;
  setScheduleRequest: (scheduleRequest: ScheduleRequest) => void;
};

// Define a type with all your state selectors and setters
const useStore = create<ScheduleRequestState>((set) => ({
  scheduleRequest: null,
  setScheduleRequest: (scheduleRequest: ScheduleRequest) =>
    set({ scheduleRequest }),
}));

export const useScheduleRequestStore = useStore;
