import { Images } from "@/utils/assets";
import { Meal } from "../types/index";

export const DUMMY_FOODS: Meal[] = [
  {
    id: "1",
    name: "Pad Thai",
    price: 120,
    images: [Images.Burger, Images.Burger],
    description: "Pad Thai is a noodle dish in Thailand.",
    ratting: 4,
  },
  {
    id: "2",
    name: "Burger",
    price: 150,
    images: [Images.Burger, Images.Burger, Images.Burger, Images.Burger],
    description: "A classic American fast food dish.",
    ratting: 5,
  },
  {
    id: "3",
    name: "Burger 12",
    price: 150,
    images: [Images.Burger],
    description: "A classic American fast food dish.",
    ratting: 5,
  },
];
