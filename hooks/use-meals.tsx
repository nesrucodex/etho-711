import { create } from "zustand";
import { Catagory, Meal } from "../types/index";
import { immer } from "zustand/middleware/immer";

const INJERA_IMAGES = [
  "https://media.istockphoto.com/id/536049837/photo/ethiopian-dinner-bread.jpg?s=612x612&w=0&k=20&c=8xqUM2tnVya3hy2tXvSKcq7i-B0TW9Jbsvgsxh1Q2uE=,",
  "https://media.istockphoto.com/id/1131938896/photo/ari-village.jpg?s=612x612&w=0&k=20&c=T-T1CQS9Igq-idqhsfTQVgUR9pFa3L8m3ivWeZ8RQ2I=",
  "https://media.istockphoto.com/id/1486751164/photo/close-up-of-injera-sour-fermented-pancake-like-flatbread-with-spongy-texture-popular-in.jpg?s=612x612&w=0&k=20&c=GstLmrZBe6w59ONfXPjMm5FzHDNGw2_rXMzX1NgkKHA=",
];

const DORO_WOT_IMAGES = [
  "https://media.istockphoto.com/id/870064540/photo/ethiopian-doro-wot.jpg?s=612x612&w=0&k=20&c=zZodpfv3j35iEQ7yhyb_R_ba5EPrcy1f7tGiIEKAHcg=",
  "https://media.istockphoto.com/id/454923963/photo/doro-wat.jpg?s=612x612&w=0&k=20&c=iEzXuYyIpOJKVWPWAUmQcmMmxMmJf_Vkp18Cvtk43iw=",
];

const KITFO_IMAGES = [
  "https://media.istockphoto.com/id/636369362/photo/marinated-beef-with-herbs-and-cheese-closeup.jpg?s=612x612&w=0&k=20&c=V7C3DPFF-xUd_sl9BEyVMnLXMrrWgmsWRq4ql36h64g=",
  "https://media.istockphoto.com/id/1514286230/photo/kitfo-bowl.jpg?s=612x612&w=0&k=20&c=gKTUTMUZY1J_sqokZ1OQQtZ2WE1Vg70SGjm_6ZsOcOo=",
  "https://media.istockphoto.com/id/1412801244/photo/ethiopian-food-kitfo-raw-beef-and-injera-bread.jpg?s=612x612&w=0&k=20&c=boWO_87gLhKmxVgrM6VBrVnagFoTbptmNg1mSK9uxwU=",
];

const IMAGES = [
  "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1664472619078-9db415ebef44?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFzdGF8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1695297516692-82b537c62733?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5qZXJhfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1668143358351-b20146dbcc02?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3VzaGl8ZW58MHx8MHx8fDA%3D",
];

export const DUMMY_CATEGORIES: Catagory[] = [
  {
    name: "Injera",
    emoji: "🫓",
  },
  {
    name: "Doro Wat",
    emoji: "🍗",
  },
  {
    name: "Kitfo", // 2
    emoji: "🥩",
  },
  {
    name: "Shiro",
    emoji: "🍲",
  },
  {
    name: "Fasolia", // 4
    emoji: "🥘",
  },
  {
    name: "Tibs",
    emoji: "🍖",
  },
  {
    name: "Burger", // 6
    emoji: "🍔",
  },
  {
    name: "Pizza",
    emoji: "🍕",
  },
  {
    name: "Pasta", // 8
    emoji: "🍝",
  },
  {
    name: "Sushi",
    emoji: "🍣",
  },
];

export const DUMMY_MEALS: Meal[] = [
  {
    name: "Injera",
    category: DUMMY_CATEGORIES[0],
    description: "Ethiopian traditional food.",
    images: [INJERA_IMAGES[2]],
    price: 12.99,
    rating: 4.5,
    likes: 123,
    deliveryTime: 20,
  },
  {
    name: "Injera Qrt",
    category: DUMMY_CATEGORIES[0],
    description: "Ethiopian traditional food.",
    images: [INJERA_IMAGES[0]],
    price: 12.99,
    rating: 4.5,
    likes: 123,
    deliveryTime: 20,
  },

  {
    name: "Sergegna Injera",
    category: DUMMY_CATEGORIES[0],
    description: "Ethiopian traditional food.",
    images: [INJERA_IMAGES[2]],
    price: 12.99,
    rating: 4.5,
    likes: 123,
    deliveryTime: 20,
  },
  {
    name: "Burger XL",
    category: DUMMY_CATEGORIES[6],
    description:
      "A large and juicy beef burger with lettuce, tomato, cheese, and our special sauce.",
    images: [IMAGES[0], IMAGES[1]],
    price: 12.99,
    rating: 4.5,
    likes: 123,
    deliveryTime: 20,
  },
  {
    name: "Margherita Pizza",
    category: DUMMY_CATEGORIES[7],
    description:
      "Classic Italian pizza topped with tomatoes, fresh mozzarella, and basil.",
    images: [IMAGES[1], IMAGES[2]],
    price: 15.99,
    rating: 4.3,
    likes: 234,
    deliveryTime: 25,
  },
  {
    name: "Spaghetti Carbonara",
    category: DUMMY_CATEGORIES[8],
    description: "A creamy pasta dish with pancetta, eggs, and parmesan.",
    images: [IMAGES[2]],
    price: 14.99,
    rating: 4.7,
    likes: 98,
    deliveryTime: 30,
  },
  {
    name: "Sushi Platter",
    category: DUMMY_CATEGORIES[9],
    description:
      "An assortment of fresh sushi rolls, sashimi, and nigiri for sushi lovers.",
    images: [IMAGES[4]],
    price: 25.99,
    rating: 4.8,
    likes: 156,
    deliveryTime: 35,
  },
  {
    name: "Chicken Tibs",
    category: DUMMY_CATEGORIES[5],
    description: "Ethiopian stir-fried chicken with spices and onions.",
    images: [INJERA_IMAGES[0]],
    price: 13.99,
    rating: 4.6,
    likes: 87,
    deliveryTime: 20,
  },
  {
    name: "Shiro Wat",
    category: DUMMY_CATEGORIES[3],
    description: "Ethiopian chickpea stew served with Injera.",
    images: [IMAGES[3]],
    price: 10.99,
    rating: 4.7,
    likes: 72,
    deliveryTime: 30,
  },
  {
    name: "Doro Wat",
    category: DUMMY_CATEGORIES[1],
    description: "Ethiopian chicken stew cooked with berbere spice and eggs.",
    images: DORO_WOT_IMAGES,
    price: 18.99,
    rating: 4.9,
    likes: 105,
    deliveryTime: 40,
  },
  {
    name: "Kitfo MD",
    category: DUMMY_CATEGORIES[2],
    description:
      "Ethiopian minced raw beef seasoned with spiced butter and mitmita.",
    images: [KITFO_IMAGES[2]],
    price: 322.99,
    rating: 4.6,
    likes: 89,
    deliveryTime: 35,
  },
  {
    name: "Kitfo Special",
    category: DUMMY_CATEGORIES[2],
    description:
      "Ethiopian minced raw beef seasoned with spiced butter and mitmita.",
    images: [KITFO_IMAGES[0]],
    price: 322.99,
    rating: 4.6,
    likes: 89,
    deliveryTime: 35,
  },
  {
    name: "Kitfo lg",
    category: DUMMY_CATEGORIES[2],
    description:
      "Ethiopian minced raw beef seasoned with spiced butter and mitmita.",
    images: [KITFO_IMAGES[2]],
    price: 322.99,
    rating: 4.6,
    likes: 89,
    deliveryTime: 35,
  },
  {
    name: "Fasolia Delight",
    category: DUMMY_CATEGORIES[4],
    description: "Ethiopian green bean and carrot stir-fry.",
    images: [IMAGES[2]],
    price: 11.99,
    rating: 4.3,
    likes: 67,
    deliveryTime: 25,
  },
].map((meal, i) => ({ id: i.toString(), ...meal }));

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
