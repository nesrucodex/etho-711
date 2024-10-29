import { Images } from "@/utils/assets";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./button";
import { ClassValue } from "clsx";
import { cn } from "@/libs/cn";

type EmptyListProps = {
  description?: string;
  buttonText?: string;
  onPress?: () => void;
  classNames?: {
    root?: ClassValue;
  };
};

const EmptyList = ({
  description,
  buttonText,
  onPress,
  classNames,
}: EmptyListProps) => {
  return (
    <SafeAreaView
      className={cn(
        "h-full bg-background items-center justify-center px-8",
        classNames?.root
      )}
    >
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
              classNames={{ root: "w-[60%] mt-12 mx-auto" }}
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
