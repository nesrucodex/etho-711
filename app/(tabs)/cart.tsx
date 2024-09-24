import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithBackTab } from "@/components/header";
import { router, useRouter } from "expo-router";
import { Image } from "expo-image";
import AddMealButton from "@/components/add-meal-button";
import Button, { LightButton } from "@/components/button";
import { Cart as TCart, useCarts } from "@/hooks/use-cart";
import { Images } from "@/utils/assets";
import { useOrder } from "@/hooks/use-order";

const Cart = () => {
  const carts = useCarts((state) => state.items);
  const clearCart = useCarts((state) => state.clearCart);
  const addOrder = useOrder((state) => state.addOrder);

  const cartPrice = carts.reduce(
    (acc, cart) => acc + cart.meal.price * cart.quantity,
    0
  );
  const deliveryFee = cartPrice * 0.15;
  const totalPrice = cartPrice + deliveryFee;

  // Event handlers
  const handlePlaceOrder = () => {
    addOrder(carts);
    clearCart();
    router.push("/(tabs)/orders");
  };

  if (carts.length === 0) return <EmptyCart />;

  return (
    <SafeAreaView className="h-full bg-background">
      <View className="px-4 py-4">
        <Text className="text-2xl font-bold text-primary">Your Carts</Text>
        <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
          {carts.map((cart) => (
            <CartItem key={cart.id} cart={cart} />
          ))}
        </ScrollView>
      </View>

      <View className="mt-4 flex-row justify-end px-4">
        <LightButton
          classNames={{
            root: "w-[85] py-3",
          }}
          onPress={() => clearCart()}
        >
          Clear
        </LightButton>
      </View>
      {/* Cart summary */}
      <View className="mt-auto pt-8 pb-6 px-4 bg-white rounded-t-[20px] border border-neutral-200">
        <CartSummaryRow
          title="Sub Total"
          value={`ETB ${cartPrice.toFixed(2)}`}
        />
        <CartSummaryRow
          title="Delivery Fee"
          value={`ETB ${deliveryFee.toFixed(2)}`}
        />
        <View className="mt-4 flex-row justify-between items-center">
          <Text className="text-lg font-semibold">Total</Text>
          <Text className="text-base font-semibold">
            ETB {totalPrice.toFixed(2)}
          </Text>
        </View>
        <Button
          onPress={() => handlePlaceOrder()}
          classNames={{ root: "mt-6" }}
        >
          Checkout
        </Button>
      </View>
    </SafeAreaView>
  );
};

type CartItemProps = {
  cart: TCart;
};

const CartItem = ({ cart }: CartItemProps) => {
  const { incrementQuantity, decrementQuantity } = useCarts();
  return (
    <View className="flex flex-row items-center gap-4 mb-3">
      <View className="w-[70] h-[70] rounded-full overflow-hidden">
        <Image
          source={{
            uri: cart.meal.images[0],
          }}
          className="w-full h-full"
          contentFit="cover"
        />
      </View>
      <View className="flex-1 flex-row items-start justify-between">
        <View>
          <Text className="text-base font-medium text-text">
            {cart.meal.name}
          </Text>
          <Text className="text-[12px] text-neutral-500">
            ETB {cart.meal.price}.0
          </Text>
        </View>
        <AddMealButton
          value={cart.quantity}
          onIncrement={() => incrementQuantity(cart.meal.id, cart.meal)}
          onDecrement={() => decrementQuantity(cart.meal.id)}
          classNames={{ icon: "w-[30] h-[30]" }}
        />
      </View>
    </View>
  );
};

type CartSummaryRowProps = {
  title: string;
  value: string;
};

export const CartSummaryRow = ({ title, value }: CartSummaryRowProps) => {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="font-medium text-neutral-700">{title}</Text>
      <Text className="text-neutral-600">{value}</Text>
    </View>
  );
};

const EmptyCart = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="h-full bg-background items-center justify-center px-8">
      <View className="w-full">
        <Image
          source={Images.EmptyCart}
          className="w-[50%] aspect-[1/1] mx-auto"
          contentFit="contain"
        />
        <View className="mt-8">
          <Text className="text-center text-lg font-semibold text-neutral-700">
            Your cart is currently empty, and there are no items added yet.
          </Text>

          <Button
            classNames={{ root: "w-[50%] mt-12 mx-auto" }}
            onPress={() => router.push("/(tabs)/meals")}
          >
            Add meals
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;