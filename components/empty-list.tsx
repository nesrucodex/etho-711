import { Images } from "@/utils/assets";
import { Image } from "expo-image";
import { Text } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./button";

type EmptyListProps = {
  description?: string;
  buttonText?: string;
  onPress?: () => void;
};

const EmptyList = ({ description, buttonText, onPress }: EmptyListProps) => {
  return (
    <SafeAreaView className="h-full bg-background items-center justify-center px-8">
      <View className="w-full">
        <Image
          source={Images.Empty}
          className="w-[50%] aspect-[1/1] mx-auto"
          contentFit="contain"
        />
        <View className="mt-8">
          <Text className="text-center text-lg font-semibold text-neutral-700">
            {description}
          </Text>
          {buttonText && (
            <Button
              classNames={{ root: "w-[50%] mt-12 mx-auto" }}
              onPress={() => onPress?.()}
            >
              {buttonText}
            </Button>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmptyList;
