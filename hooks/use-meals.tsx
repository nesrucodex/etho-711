import { create } from "zustand";
import { Meal } from "../types/index";
import { immer } from "zustand/middleware/immer";

const IMAGES = [
  "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1487790343276-2fe56a7d9439?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8fDA%3D",
];

const DUMMY_MEALS: Meal[] = [
  {
    id: "1",
    name: "Spaghetti Bolognese",
    category: "Dish",
    description:
      "Classic pasta dish with tomatoes, basil, olive oil, mozzarella, and a side of meatballs.",
    images: IMAGES,
    price: 12.99,
    rating: 4.5,
    likes: 123,
    deliveryTime: 20,
  },
  {
    id: "3",
    name: "Pizza",
    category: "Dish",
    description: "A classic Italian dish.",
    images: [IMAGES[1], IMAGES[2]],
    price: 18.99,

    rating: 4.2,
    likes: 156,
    deliveryTime: 30,
  },
  {
    id: "4",
    name: "Tacos",
    category: "Dish",
    description: "A Mexican dish.",
    images: [IMAGES[2]],
    price: 10.99,

    rating: 4.8,
    likes: 87,
    deliveryTime: 40,
  },
];

type State = {
  meals: Meal[];
};

type Actions = {
  initMeals: (meals: Meal[]) => void;
  filterByCategory: (category: string) => void;
};

export const useMeals = create<State & Actions>()(
  immer((set) => ({
    meals: [...DUMMY_MEALS],
    initMeals: (meals: Meal[]) => {
      set({ meals });
    },
    filterByCategory: (category: string) => {},
  }))
);
