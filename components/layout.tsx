import { View } from "react-native";
import React, { ReactNode } from "react";
import { cn } from "@/libs/cn";

type Props = {
  children?: ReactNode;
  className?: string;
};
export const Group = ({ children, className }: Props) => {
  return (
    <View className={cn("flex-row items-center", className)}>{children}</View>
  );
};

export const Center = ({ children, className }: Props) => {
  return (
    <View className={cn("flex-row items-center justify-center", className)}>
      {children}
    </View>
  );
};
