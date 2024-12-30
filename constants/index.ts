import Colors from "./Colors";

export { Colors };

type Catagory = {
  name: string;
  emoji: string;
};
export const CATAGORIES: Catagory[] = [];

export const TABS = {
  meals: "Meals",
  carts: "Cart",
  orders: "Orders",
  account: "Account",
  notification: "Notifications",
};
