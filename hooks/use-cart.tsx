import { create } from "zustand";
import { Meal } from "../types/index";
import { immer } from "zustand/middleware/immer";

import uuid from "react-native-uuid";

const generateUUID = () => Date.now().toString();

export type Cart = {
  id: string;
  meal: Meal;
  quantity: number;
};

type State = {
  items: Cart[];
};

type Actions = {
  removeMeal: (id: Meal["id"]) => void;
  updateQuantity: (id: Meal["id"], quantity: number) => void;
  incrementQuantity: (id: Meal["id"], meal: Meal) => void;
  decrementQuantity: (id: Meal["id"]) => void;
  clearCart: () => void;
};

export const useCarts = create<State & Actions>()(
  immer((set) => ({
    items: [],
    removeMeal: (id) => {
      set((state) => {
        state.items = state.items.filter((item) => item.meal.id === id);
      });
    },
    updateQuantity: (id, quantity) => {
      set((state) => {
        const mealIndex = state.items.findIndex((item) => item.meal.id === id);
        if (mealIndex >= 0) {
          if (state.items[mealIndex].quantity === 0)
            state.items.splice(mealIndex, 1);
          else state.items[mealIndex].quantity = quantity;
        }
      });
    },
    incrementQuantity: (id, meal) => {
      set((state) => {
        const mealIndex = state.items.findIndex((item) => item.meal.id === id);
        if (mealIndex >= 0) state.items[mealIndex].quantity += 1;
        else
          state.items.push({
            id: generateUUID(),
            meal,
            quantity: 1,
          });
      });
    },
    decrementQuantity: (id) => {
      set((state) => {
        const mealIndex = state.items.findIndex((item) => item.meal.id === id);
        if (mealIndex >= 0) {
          if (state.items[mealIndex].quantity === 1)
            state.items.splice(mealIndex, 1);
          else state.items[mealIndex].quantity -= 1;
        }
      });
    },
    clearCart: () => {
      set((state) => {
        state.items = [];
      });
    },
  }))
);
