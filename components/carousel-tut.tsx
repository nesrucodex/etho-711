import {
  View,
  Text,
  Animated,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DUMMY_MEALS } from "@/hooks/use-meals";
import { Image } from "expo-image";
// import Animated from "react-native-reanimated";

const SPACING = 8;

const CarouselTut = () => {
  const { width, height } = useWindowDimensions();
  const itemWidth = width * 0.85;

  const { top } = useSafeAreaInsets();
  const scrollX = useRef(new Animated.Value(0)).current;

  console.log({ scrollX });

  return (
    <View
      style={{
        marginTop: top,
      }}
    >
      <StatusBar translucent />
      <Text className="h-10 border text-2xl font-bold pl-4">
        Carousel Tutorial
      </Text>
      <Animated.FlatList
        data={DUMMY_MEALS}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          height: height - 100,
          alignItems: "center",
        }}
        snapToInterval={itemWidth}
        decelerationRate={0}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          { useNativeDriver: true } // Enables native driver for performance
        )}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: itemWidth,
            }}
            className="border rounded-lg"
          >
            <View
              style={{
                marginHorizontal: SPACING,
                paddingHorizontal: SPACING * 2,
              }}
              className="relative rounded-lg bg-sky-300"
            >
              <View className="w-14 h-14 items-center justify-center absolute left-0 top-0 bg-white rounded-full z-[99]">
                <Text className="text-3xl ">{index + 1}</Text>
              </View>
              <Image
                source={{ uri: item.images[0] }}
                className="w-full h-[500] rounded-lg"
                contentFit="cover"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CarouselTut;
