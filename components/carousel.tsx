import { cn } from "@/libs/cn";
import { ClassValue } from "clsx";
import { Image, ImageContentFit } from "expo-image";
import { View, Pressable, Text } from "react-native";

type CarouselItemProps = {
  title?: string;
  source: string;
  contentFit?: ImageContentFit;

  classNames?: {
    images?: {
      root?: ClassValue;
      main?: ClassValue;
    };
  };
};
export const CarouselItem = ({
  title,
  source,
  classNames,
  contentFit = "contain",
}: CarouselItemProps) => {
  return (
    <View>
      {title && (
        <Text className="mb-8 px-4 text-2xl text-text font-bold text-center">
          {title}
        </Text>
      )}

      <View className={cn("items-center", classNames?.images?.root)}>
        <Image
          source={source}
          alt="App overview"
          contentFit={contentFit}
          className={cn("w-full h-[300px]", classNames?.images?.main)}
        />
      </View>
    </View>
  );
};

type CarouselIndicatorProps = {
  activeIndex: number;
  itemsCount: number;
  onIndicatorPress: (step: number) => void;
};
export const CarouselIndicator = ({
  activeIndex,
  itemsCount,
  onIndicatorPress,
}: CarouselIndicatorProps) => {
  return (
    <View className="flex-row items-center justify-center gap-x-2.5">
      {Array.from({ length: itemsCount }, (_, index) => index).map((index) => (
        <Pressable
          onPress={() => onIndicatorPress(index)}
          key={index}
          className={cn("w-2 h-2 rounded-full bg-neutral-300", {
            "bg-primary": index === activeIndex,
          })}
        ></Pressable>
      ))}
    </View>
  );
};
