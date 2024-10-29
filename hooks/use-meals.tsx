import { create } from "zustand";
import { Catagory, Meal } from "../types/index";
import { immer } from "zustand/middleware/immer";

const IMAGES = [
  "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1664472619078-9db415ebef44?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFzdGF8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1695297516692-82b537c62733?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5qZXJhfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1668143358351-b20146dbcc02?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3VzaGl8ZW58MHx8MHx8fDA%3D",
];

const DUMMY_CATEGORIES: Catagory[] = [
  {
    id: "1",
    name: "Burger",
    imojji: "🍔",
  },
  {
    id: "2",
    name: "Pizza",
    imojji: "🍕",
  },
  {
    id: "3",
    name: "Pasta",
    imojji: "🍝",
  },
  {
    id: "4",
    name: "Injera",
    imojji: "🍥",
  },
  {
    id: "5",
    name: "Sushi",
    imojji: "🍣",
  },
];

export const DUMMY_MEALS: Meal[] = [
  {
    id: "1",
    name: "Spaghetti Bolognese",
    category: DUMMY_CATEGORIES[0],
    description:
      "Classic pasta dish with tomatoes, basil, olive oil, mozzarella, and a side of meatballs.",
    images: IMAGES,
    price: 12.99,
    rating: 4.5,
    likes: 123,
    deliveryTime: 20,
  },
  {
    id: "2",
    name: "Pizza",
    category: DUMMY_CATEGORIES[1],
    description: "A classic Italian dish.",
    images: [IMAGES[1], IMAGES[2]],
    price: 18.99,

    rating: 4.2,
    likes: 156,
    deliveryTime: 30,
  },
  {
    id: "3",
    name: "Tacos",
    category: DUMMY_CATEGORIES[2],
    description: "A Mexican dish.",
    images: [IMAGES[2]],
    price: 10.99,

    rating: 4.8,
    likes: 87,
    deliveryTime: 40,
  },
  {
    id: "4",
    name: "Aynet",
    category: DUMMY_CATEGORIES[3],
    description: "A Ethiopian dish.",
    images: [IMAGES[3]],
    price: 10.99,

    rating: 4.8,
    likes: 87,
    deliveryTime: 40,
  },
  {
    id: "5",
    name: "Sushi",
    category: DUMMY_CATEGORIES[4],
    description: "A chaina's dish.",
    images: [IMAGES[4]],
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
