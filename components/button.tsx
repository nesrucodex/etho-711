import { cn } from "@/libs/cn";
import { ClassValue } from "clsx";
import React, { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  children?: ReactNode;
  classNames?: {
    root?: ClassValue;
    text?: ClassValue;
  };
  onPress?: () => void;
};

const Button = ({ children, classNames, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn("w-full bg-primary py-4 rounded-full", classNames?.root)}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text
        className={cn(
          "text-center  text-white font-semibold",
          classNames?.text
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
export const SecondaryButton = ({
  children,
  classNames,
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        "w-full border border-primary py-4 rounded-full",
        classNames?.root
      )}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text
        className={cn(
          "text-center  text-primary font-semibold",
          classNames?.text
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
export const LightButton = ({ children, classNames, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn("w-full bg-primary/10 py-4 rounded-full", classNames?.root)}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text
        className={cn(
          "text-center  text-primary font-semibold",
          classNames?.text
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

type ButtonIconProps = {
  icon: ReactNode;
  onPress?: () => void;
  classNames?: {
    root?: ClassValue;
  };
};

export const ButtonIcon = ({ icon, onPress, classNames }: ButtonIconProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      className={cn(
        "h-[40] w-[40] flex items-center justify-center bg-white rounded-full border border-neutral-100",
        classNames?.root
      )}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default Button;
