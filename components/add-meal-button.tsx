import { Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { ButtonIcon } from "@/components/button";
import { ClassValue } from "clsx";
import { cn } from "@/libs/cn";

type AddMealButtonProps = {
  initialValue?: number;
  value?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  withMinus?: boolean;

  classNames?: {
    root?: ClassValue;
    wrapper?: ClassValue;
    icon?: ClassValue;
    count?: ClassValue;
  };
};

const AddMealButton = ({
  value = 0,
  onIncrement,
  onDecrement,
  initialValue = 0,
  classNames,
  withMinus = true,
}: AddMealButtonProps) => {
  return (
    <View className={cn(classNames?.root)}>
      {value === 0 ? (
        <ButtonIcon
          classNames={{
            root: cn("border-0 bg-primary w-[40] h-[40]", classNames?.icon),
          }}
          onPress={onIncrement}
          icon={<Feather name="plus" color="white" size={16} />}
        />
      ) : (
        <View
          className={cn(
            "flex-row items-center bg-neutral-100 rounded-full",
            classNames?.wrapper
          )}
        >
          {withMinus && (
            <ButtonIcon
              classNames={{
                root: cn("border-0 w-[40] h-[40]", classNames?.icon),
              }}
              onPress={onDecrement}
              icon={<Feather name="minus" size={18} />}
            />
          )}
          <Text className={cn("mx-3 font-semibold", classNames?.count)}>
            {value || initialValue}
          </Text>
          <ButtonIcon
            classNames={{
              root: cn("border-0 w-[40] h-[40] bg-primary", classNames?.icon),
            }}
            onPress={onIncrement}
            icon={<Feather name="plus" size={18} color="white" />}
          />
        </View>
      )}
    </View>
  );
};

export default AddMealButton;
