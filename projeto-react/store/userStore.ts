import create from "zustand";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
}

type userState = {
  user: User | null;
  setUser: (user: User) => void;
};

// Define a type with all your state selectors and setters
const useStore = create<userState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
}));

export const useUserStore = useStore;
