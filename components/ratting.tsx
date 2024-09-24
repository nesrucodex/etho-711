import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants";

type RattingProps = { ratting: number };
const Ratting = ({ ratting }: RattingProps) => {
  return (
    <View className="flex-row items-center">
      <MaterialIcons name="star-rate" size={16} color={Colors.light.primary} />
      <Text className="text-neutral-500 ml-[2px]">{ratting}+</Text>
    </View>
  );
};

type RattingWithRepProps = RattingProps & {
  withRatingNumber?: boolean;
  rightComponent?: ReactNode;
};

export const RattingWithRep = ({
  ratting,
  withRatingNumber = true,
  rightComponent,
}: RattingWithRepProps) => {
  return (
    <View className="flex-row items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <MaterialIcons
          key={i}
          name="star-rate"
          size={16}
          color={ratting >= i ? Colors.light.primary : "#ccc"}
        />
      ))}
      {rightComponent ||
        (withRatingNumber && (
          <Text className="text-neutral-500 ml-[2px]">{ratting}</Text>
        ))}
    </View>
  );
};

export default Ratting;
