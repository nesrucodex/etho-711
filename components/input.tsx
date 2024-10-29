import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { cn } from "@/libs/cn";
import { ClassValue } from "clsx";
import { Colors } from "@/constants";
import { KeyboardTypeOptions } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  value?: string;
  label?: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;

  classNames?: {
    root?: ClassValue;
    inputWrapper?: ClassValue;
    input?: ClassValue;
    label?: ClassValue;
  };
};

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  classNames,
  keyboardType = "default",
  secureTextEntry = false,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <View className={cn("", classNames?.root)}>
      {label && (
        <Text className={cn("text-neutral-500 pl-2 mb-1", classNames?.label)}>
          {label}
        </Text>
      )}
      <View
        className={cn(
          "h-[50] border border-neutral-400 rounded-full transition focus:border-primary",
          { "flex-row": secureTextEntry },
          classNames?.inputWrapper
        )}
      >
        <TextInput
          className={cn(
            "flex-1 px-4",
            { "pl-4 pr-0": secureTextEntry },
            classNames?.input
          )}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          selectionColor={Colors.light.primary}
          keyboardType={keyboardType}
          secureTextEntry={isPasswordVisible}
        />

        {secureTextEntry && (
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={togglePasswordVisibility}
            className="w-12 flex items-center justify-center"
          >
            {isPasswordVisible ? (
              <Feather name="eye-off" color={Colors.light.primary} size={16} />
            ) : (
              <Feather name="eye" color={Colors.light.primary} size={16} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
