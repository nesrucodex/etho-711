import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons from expo
import { Notification } from "@/types/index";
import { LightButton } from "@/components/button";
import { neutral } from "@/utils";
import { TabHeader } from "@/components/header";

const notifications: Notification[] = [
  {
    id: "1",
    title: "Order Placed",
    description: "Your order has been confirmed.",
    icon: "check-circle", // MaterialIcons icon name
  },
  {
    id: "2",
    title: "Meal Preparation",
    description: "Your meal is being prepared.",
    icon: "restaurant-menu",
  },
  {
    id: "3",
    title: "Out for Delivery",
    description: "Your meal is on the way.",
    icon: "delivery-dining",
  },
];

const NotificationsScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-4 bg-background">
      <View className="mb-4 mt-2">
        <TabHeader
          title="Notifications"
          rightComponent={
            <View>
              <Feather name="more-vertical" size={20} />
            </View>
          }
        />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        )}
      />
    </SafeAreaView>
  );
};

type NotificationItemProps = {
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const NotificationItem = ({
  title,
  description,
  icon,
}: NotificationItemProps) => (
  <View className="bg-white px-2 py-2.5 rounded-lg mb-2 flex-row items-center">
    <MaterialIcons name={icon} size={25} color={neutral(0.85, true)} />
    <View className="flex-1 ml-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-bold text-text">{title}</Text>
        <Text className="text-[12px] text-neutral-500">2 min ago</Text>
      </View>
      <Text className="text-neutral-500">{description}</Text>
    </View>
  </View>
);

export default NotificationsScreen;
