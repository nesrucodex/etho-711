import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Notification } from "../types/index";

const generateUUID = () => Date.now().toString();

type State = {
  notifications: Notification[];
};

type Actions = {
  addNotification: (notification: Omit<Notification, "id">) => void;
};
export const useOrder = create<State & Actions>()(
  immer((set) => ({
    notifications: [],
    addNotification: (item) => {
      set((state) => {
        state.notifications.push({
          id: generateUUID(),
          ...item,
        });
      });
    },
  }))
);
