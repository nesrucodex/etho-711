import { Tabs } from "expo-router";
import React from "react";
import TabBarIcon from "@/components/tab-bar-icon";
import { Colors } from "@/constants/colors";
import { TABS } from "@/constants";
import { View } from "react-native";
import { neutral } from "@/utils";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          borderTopColor: "#fff",
          borderTopWidth: 1,
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="meals"
        options={{
          title: TABS.meals,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              title={TABS.meals}
              focused={focused}
              name={"home"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: TABS.carts,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              title={TABS.carts}
              focused={focused}
              name={"shopping-cart"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: TABS.orders,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              title={TABS.orders}
              focused={focused}
              name={"shopping-bag"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: TABS.notification,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              title={TABS.notification}
              focused={focused}
              name={"bell"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: TABS.account,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              title={TABS.account}
              focused={focused}
              name={"user"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
