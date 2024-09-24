import { MaterialIcons } from "@expo/vector-icons";

export type Catagory = {
  name: string;
  icon: string;
};

export type Meal = {
  id: string;
  name: string;
  category: Catagory["name"];
  description: string;
  images: string[];
  price: number;
  rating: number;
  likes: number;
  deliveryTime: number;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};
