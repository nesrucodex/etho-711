import React, { useState } from "react";
import { View, Text, Switch, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants";

const profileOptions: {
  id: string;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}[] = [
  {
    id: "1",
    title: "Order History",
    icon: "history",
  },
  {
    id: "2",
    title: "Saved Addresses",
    icon: "location-on",
  },
  {
    id: "3",
    title: "Payment Methods",
    icon: "payment",
  },
  {
    id: "4",
    title: "Help & Support",
    icon: "support",
  },
];

const ProfileScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isAmharic, setIsAmharic] = useState(false);
  const userName = "John Doe"; // Example username
  const userInitials = userName.substring(0, 2).toUpperCase(); // Take first two letters

  return (
    <SafeAreaView className="flex-1 px-4 py-4 bg-gray-100">
      {/* User Avatar */}
      <View className="items-center mb-6">
        <View className="bg-primary-500 h-24 w-24 rounded-full justify-center items-center">
          <Text className="text-3xl font-bold text-white">{userInitials}</Text>
        </View>
        <Text className="text-xl font-bold mt-4 text-text">{userName}</Text>
      </View>

      {/* Theme Toggle */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-text">Dark Theme</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={() => setIsDarkTheme((prev) => !prev)}
          thumbColor={isDarkTheme ? "#FE554A" : "#ccc"}
        />
      </View>

      {/* Language Toggle */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-text">Amharic/English</Text>
        <Switch
          value={isAmharic}
          onValueChange={() => setIsAmharic((prev) => !prev)}
          thumbColor={isAmharic ? "#FE554A" : "#ccc"}
        />
      </View>

      {/* Fancy Profile Settings */}
      <Text className="text-2xl font-bold mb-6 text-text">
        Profile Settings
      </Text>
      <FlatList
        data={profileOptions}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.75}
            className="bg-white p-4 rounded-lg shadow-md mb-4 flex-row items-center"
          >
            <MaterialIcons
              name={item.icon}
              size={30}
              color={Colors.light.primary}
            />
            <Text className="ml-2 text-lg font-bold text-text">
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Additional Fancy Stuff */}
      {/* <TouchableOpacity className="bg-white p-4 rounded-lg shadow-md flex-row items-center">
        <FontAwesome name="gift" size={30} color="#FE554A" className="mr-4" />
        <Text className="ml-2  text-lg font-bold text-text">
          Redeem Rewards
        </Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default ProfileScreen;
