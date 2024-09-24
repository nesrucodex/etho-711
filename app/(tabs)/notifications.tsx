import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons from expo
import { Notification } from "@/types/index";
import { Colors } from "@/constants";

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
    <SafeAreaView className="flex-1 px-4  py-4 bg-background">
      <Text className="text-2xl font-bold mb-6 text-primary">
        Notifications
      </Text>
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
  <View className="bg-white p-4 rounded-lg shadow-md border border-neutral-100 mb-4 flex-row items-center">
    <MaterialIcons name={icon} size={30} color={Colors.light.primary} />
    <View className="ml-2">
      <Text className="text-lg font-bold text-gray-900">{title}</Text>
      <Text className="text-gray-600">{description}</Text>
    </View>
  </View>
);

export default NotificationsScreen;
