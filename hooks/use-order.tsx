import { create } from "zustand";
import { Cart } from "./use-cart";
import { immer } from "zustand/middleware/immer";

const generateUUID = () => Date.now().toString();

const DELIVERY_FEE = 0.15;

type State = {
  orders: {
    id: string;
    items: Cart[];
    total: number;
  }[];
};

type Actions = {
  addOrder: (items: Cart[]) => void;
};
export const useOrder = create<State & Actions>()(
  immer((set) => ({
    orders: [],
    addOrder: (items) => {
      set((state) => {
        let orderPrice = items.reduce(
          (acc, item) => acc + item.meal.price * item.quantity,
          0
        );

        const deliveryCost = orderPrice * DELIVERY_FEE;

        state.orders.push({
          id: generateUUID(),
          items,
          total: orderPrice + deliveryCost,
        });
      });
    },
  }))
);
