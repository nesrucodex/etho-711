import Colors from "./Colors";

export { Colors };

type Catagory = {
  name: string;
  emoji: string;
};
export const CATAGORIES: Catagory[] = [
  {
    name: "All",
    emoji: "😋",
  },
  {
    name: "Pizza",
    emoji: "🍕",
  },
  {
    name: "Burger",
    emoji: "🍔",
  },
  {
    name: "Drinks",
    emoji: "🍸",
  },
];

export const TABS = {
  meals: "Meals",
  carts: "Cart",
  orders: "Orders",
  account: "Account",
  notification: "Notifications",
};
