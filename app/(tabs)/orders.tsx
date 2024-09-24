import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithBackTab } from "@/components/header";
import { Link, router } from "expo-router";
import { Cart } from "@/hooks/use-cart";
import { Image } from "expo-image";
import { useOrder } from "@/hooks/use-order";
import Button from "@/components/button";
import { Images } from "@/utils/assets";

const Orders = () => {
  const orders = useOrder((state) => state.orders);
  const isOrdersEmpty = orders.length === 0;

  if (isOrdersEmpty) return <EmptyOrders />;
  return (
    <SafeAreaView className="h-full bg-background">
      <View className="px-4 py-4">
        <HeaderWithBackTab
          title="Your Orders"
          onBackPress={() => router.back()}
        />

        <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
          {orders.map((order) => (
            <OrderItem order={order} key={order.id} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

type OrderItemProps = {
  order: {
    id: string;
    items: Cart[];
    total: number;
  };
};

const OrderItem = ({ order }: OrderItemProps) => {
  const formattedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(Date.now());
  return (
    <View className="mb-6">
      <View className="mb-2">
        <Link key={order.id} href={`/order/${order.id}`}>
          <Text className="italic text-lg">#{order.id}</Text>
        </Link>
      </View>
      <FlatList
        data={order.items}
        className="px-2"
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{
                uri: item.meal.images[0],
              }}
              className="w-[100] h-[100] rounded-full mr-2"
              contentFit="cover"
            />
            <Text className="absolute text-2xl font-semibold">
              {item.quantity}
            </Text>
          </View>
        )}
      />

      <View className="mt-2 flex-row justify-between items-center">
        <Text className="text-neutral-400">{formattedDate}</Text>
        <Text className="text-base text-text">
          ETB {order.total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const EmptyOrders = () => {
  return (
    <SafeAreaView className="h-full bg-background items-center justify-center px-8">
      <View className="w-full">
        <Image
          source={Images.Empty}
          className="w-[50%] aspect-[1/1] mx-auto"
          contentFit="contain"
        />
        <View className="mt-8">
          <Text className="text-center text-lg font-semibold text-neutral-700">
            Your orders are empty, no items added yet.
          </Text>

          <Button
            classNames={{ root: "w-[50%] mt-12 mx-auto" }}
            onPress={() => router.push("/(tabs)/cart")}
          >
            Add orders
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Orders;
