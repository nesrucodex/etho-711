import React, { ReactNode, useState } from "react";
import { View, Text, Switch, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { router } from "expo-router";

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
  const userName = "Nesru Muhammed"; // Example username
  const userInitials = userName.substring(0, 2).toUpperCase(); // Take first two letters

  return (
    <SafeAreaView className="h-full px-4 bg-background">
      {/* User Avatar */}
      <View className="flex-row items-center mt-6 mb-6">
        <View className="mr-4 bg-primary h-[60] w-[60] rounded-full justify-center items-center">
          <Text className="text-2xl font-bold text-white">{userInitials}</Text>
        </View>
        <View>
          <Text className="text-xl font-medium text-text">{userName}</Text>
          <Text className="text-neutral-500 ">nesrucodex@gmail.com</Text>
        </View>
      </View>

      {/* Theme Toggle */}
      <ProfileOption
        title="Theme"
        iconComponent={<Feather name="moon" size={20} />}
        rightComponent={
          <CustomSwitch checked={isDarkTheme} onValueChange={setIsDarkTheme} />
        }
      />
      <ProfileOption
        title="Amharic/English"
        icon="language"
        rightComponent={
          <CustomSwitch checked={isAmharic} onValueChange={setIsAmharic} />
        }
      />
      <ProfileOption title="Edit account" icon="verified-user" />
      <ProfileOption
        title="Order history"
        icon="history"
        onPress={() => router.push("/(tabs)/orders")}
      />
      <ProfileOption title="Save my current address" icon="location-city" />
      <ProfileOption title="Help & Support" icon="help-center" />
      <ProfileOption
        title="Sign out"
        icon="logout"
        onPress={() => router.replace("/(auth)/sign-in")}
      />
    </SafeAreaView>
  );
};
type ProfileOptionProps = {
  title: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  rightComponent?: ReactNode;
  iconComponent?: ReactNode;
  onPress?: () => void;
};
const ProfileOption = ({
  title,
  icon,
  iconComponent,
  rightComponent,
  onPress,
}: ProfileOptionProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress?.()}
      className="h-[50] flex-row justify-between items-center"
    >
      <View className="flex-row items-center">
        {icon ? <MaterialIcons name={icon} size={20} /> : iconComponent}
        <Text className="ml-2 text-text text-base">{title}</Text>
      </View>

      {rightComponent}
    </TouchableOpacity>
  );
};

type CustomSwitchProps = {
  checked: boolean;
  onValueChange: (value: boolean) => void;
};
const CustomSwitch = ({ checked, onValueChange }: CustomSwitchProps) => {
  return (
    <Switch
      value={checked}
      onValueChange={onValueChange}
      thumbColor={checked ? Colors.light.primary : "#777"}
      trackColor={{
        true: `${Colors.light.primary}40`,
        false: "#ccc",
      }}
    />
  );
};

export default ProfileScreen;
