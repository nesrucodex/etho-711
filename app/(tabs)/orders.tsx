import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { Cart } from "@/hooks/use-cart";
import { Image } from "expo-image";
import { useOrder } from "@/hooks/use-order";
import Button from "@/components/button";
import { Images } from "@/utils/assets";
import { TabHeader } from "@/components/header";
import { Feather } from "@expo/vector-icons";
import EmptyList from "@/components/empty-list";

const Orders = () => {
  const orders = useOrder((state) => state.orders);
  const isOrdersEmpty = orders.length === 0;

  if (isOrdersEmpty)
    return (
      <EmptyList
        description="Your orders are empty, no items added yet."
        buttonText="Add cart"
        onPress={() => router.push("/(tabs)/cart")}
      />
    );
  return (
    <SafeAreaView className="h-full px-4 bg-background">
      <View className="mt-2">
        <TabHeader
          title="Your orders"
          rightComponent={
            <View>
              <Feather name="more-vertical" size={20} />
            </View>
          }
        />

        <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
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
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="italic text-text text-base">#{order.id}</Text>

        <Link key={order.id} href={`/order/${order.id}`}>
          <Text className="text-primary font-medium underline">View</Text>
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
              className="w-[65] h-[65] rounded-full mr-2"
              contentFit="cover"
            />
            <Text
              className="absolute italic text-white text-2xl font-semibold"
              style={{
                textShadowColor: "black",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 2,
              }}
            >
              {item.quantity}
            </Text>
          </View>
        )}
      />

      <View className="mt-2 flex-row justify-between items-center">
        <Text className="text-neutral-400 text-[12px]">{formattedDate}</Text>
        <Text className="text-base text-text">
          ETB {order.total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default Orders;
