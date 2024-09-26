import { Text, View } from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";
import { cn } from "@/libs/cn";
import { TABS } from "@/constants";
import { neutral } from "@/utils";
import { useCarts } from "@/hooks/use-cart";
import { useOrder } from "@/hooks/use-order";

type TabBarIconProps = {
  name: keyof typeof Feather.glyphMap;
  color: string;
  focused: boolean;
  title?: string;
};

const TabBarIcon = ({ name, title, color, focused }: TabBarIconProps) => {
  let iconColor = focused ? "white" : neutral(0.5, true);

  // Determining carts badge
  const isCart = title === TABS.carts;
  const isNotification = title === TABS.notification;
  const notificationsCount = 1;
  const cartsCount = useCarts((state) => state.items).length;
  const showCartsBadge = isCart && cartsCount !== 0;
  const isOrders = title === TABS.orders;
  const orderCount = useOrder((order) => order.orders).length;

  return (
    <View
      className={cn(
        "w-10 h-10 justify-center items-center rounded-full transition-all duration-400 ",
        {
          "bg-primary -top-0.5": focused,
        }
      )}
    >
      <View className="relative">
        <Feather name={name} size={18} color={iconColor} />
        {showCartsBadge && (
          <View className="absolute w-4 h-4 items-center justify-center rounded-full -top-3 -right-3 bg-red-500">
            <Text className="text-[10px] text-white ">{cartsCount}</Text>
          </View>
        )}
        {isNotification && (
          <View className="absolute w-4 h-4 items-center justify-center rounded-full -top-3 -right-3 bg-red-500">
            <Text className="text-[10px] text-white ">
              {notificationsCount}
            </Text>
          </View>
        )}
        {isOrders && orderCount > 0 && (
          <View className="absolute w-4 h-4 items-center justify-center rounded-full -top-3 -right-3 bg-red-500">
            <Text className="text-[10px] text-white ">{orderCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TabBarIcon;
