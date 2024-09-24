import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Images } from "@/utils/assets";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button, { SecondaryButton } from "@/components/button";
import { useRouter } from "expo-router";

import { StatusBar } from "expo-status-bar";

import PagerView from "react-native-pager-view";
import Header from "@/components/header";
import { CarouselIndicator, CarouselItem } from "@/components/carousel";

const Welcome = () => {
  const [activeItem, setActiveItem] = useState(0);
  const router = useRouter();
  const carouselRef = useRef<PagerView | null>(null);
  const { top } = useSafeAreaInsets();

  // Event handlers
  const handleCarouselScroll = (step: number) => {
    setActiveItem(step);
    carouselRef.current?.setPage(step);
  };
  return (
    <View className="h-full bg-background">
      <View className="px-4" style={{ paddingTop: top }}>
        <Header
          classNames={{
            root: "mb-10",
          }}
        />
      </View>

      <PagerView
        ref={carouselRef}
        className="h-[380px] w-full"
        initialPage={activeItem}
        onPageScroll={(ev) => {
          setActiveItem(ev.nativeEvent.position);
        }}
      >
        <CarouselItem
          title="Discover and Order from Your Favorite Restaurant"
          source={Images.Burger}
        />
        <CarouselItem
          title="Choose from a wide range of delicious meals"
          source={Images.Meals}
        />
        <CarouselItem
          title="Enjoy instant delivery and payment"
          source={Images.Deliver2}
          classNames={{
            images: {
              root: "h-[260px] p-2",
              main: "h-[240px]",
            },
          }}
        />
      </PagerView>
      <CarouselIndicator
        itemsCount={3}
        activeIndex={activeItem}
        onIndicatorPress={handleCarouselScroll}
      />

      <View className="mt-auto mb-8 px-4 flex-row justify-between">
        <SecondaryButton
          onPress={() => router.push("/(auth)/sign-in")}
          classNames={{
            root: "w-[35%] ",
          }}
        >
          Sign In
        </SecondaryButton>
        <Button
          onPress={() => router.push("/(auth)/sign-up")}
          classNames={{
            root: "w-[60%]",
          }}
        >
          Create an account
        </Button>
      </View>
      <StatusBar />
    </View>
  );
};

export default Welcome;
