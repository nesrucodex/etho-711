import { cn } from "@/libs/cn";
import { Images } from "@/utils/assets";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Href, Link } from "expo-router";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { ButtonIcon } from "./button";

type Props = {
  rightContent?: string;
  rightContentHref?: Href<string>;
  classNames?: {
    root?: string;
    image?: string;
    text?: string;
  };
};

const Header = ({
  classNames,
  rightContent,
  rightContentHref = "/(tabs)/meals",
}: Props) => {
  return (
    <View
      className={cn("items-center justify-center relative", classNames?.root)}
    >
      <Image
        source={Images.Logo}
        alt="Logo"
        className={cn("w-[35] h-[35]", classNames?.image)}
        contentFit="contain"
      />
      <Link
        href={rightContentHref}
        className={cn(
          "absolute top-0-translate-y-1/2 right-0 text-primary font-semibold",
          classNames?.text
        )}
      >
        {rightContent || "Skip"}
      </Link>
    </View>
  );
};

type HeaderWithBackTab = {
  onBackPress: () => void;
  title?: string;
};
export const HeaderWithBackTab = ({
  title,
  onBackPress,
}: HeaderWithBackTab) => {
  return (
    <View className="flex-row items-center">
      <ButtonIcon
        classNames={{
          root: "bg-white/50",
        }}
        onPress={() => onBackPress()}
        icon={<Feather name="arrow-left" size={25} />}
      />
      {title && (
        <Text className="ml-4 text-xl  font-semibold text-text">{title}</Text>
      )}
    </View>
  );
};

type TabHeaderProps = {
  title: string;
  rightComponent?: ReactNode;
  classNames?: {
    root?: string;
    text?: string;
  };
};

export const TabHeader = ({
  title,
  rightComponent,
  classNames,
}: TabHeaderProps) => {
  return (
    <View className={cn("flex-row justify-between items-center", classNames?.root)}>
      <Text className={cn("text-xl font-semibold text-text", classNames?.text)}>
        {title}
      </Text>
      {rightComponent}
    </View>
  );
};
export default Header;
