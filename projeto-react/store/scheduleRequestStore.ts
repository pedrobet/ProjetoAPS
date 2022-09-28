import create from "zustand";


interface ScheduleRequest {
  _id: string;
  id: string;
  doctor: string;
  patient: string;
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
