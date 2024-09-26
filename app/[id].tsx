import { View, Text, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import { CarouselIndicator, CarouselItem } from "@/components/carousel";

import Button, { ButtonIcon } from "@/components/button";
import { HeaderWithBackTab } from "@/components/header";
import { Group } from "@/components/layout";
import { RattingWithRep } from "@/components/ratting";
import AddMealButton from "@/components/add-meal-button";
import { useMeals } from "@/hooks/use-meals";
import { useCarts } from "@/hooks/use-cart";
import { StatusBar } from "expo-status-bar";

const Detail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const carouselRef = useRef<PagerView | null>(null);
  const [activeItem, setActiveItem] = useState(0);
  const meals = useMeals((state) => state.meals);
  const { incrementQuantity, decrementQuantity, items } = useCarts();

  const cart = items.find((item) => item.meal.id === id);

  // Drived state
  let meal = meals.find((meal) => meal.id === id);

  const formattedDeliveryTime = Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(meal?.deliveryTime);

  // Event handlers
  const handleCarouselScroll = (step: number) => {
    setActiveItem(step);
    carouselRef.current?.setPage(step);
  };

  // If meal is `undefined`
  if (!meal)
    return (
      <SafeAreaView className="h-full items-center justify-center">
        <View className="">
          <Text>Meal not found.</Text>
        </View>
      </SafeAreaView>
    );

  return (
    <View className="h-full bg-background">
      <StatusBar translucent />
      <View className="absolute top-6 left-4 z-[99]">
        <HeaderWithBackTab
          // title={meal.name}
          onBackPress={() => router.back()}
        />
      </View>

      <PagerView
        ref={carouselRef}
        className="h-[250] w-full mb-4"
        initialPage={activeItem}
        onPageScroll={(ev) => {
          setActiveItem(ev.nativeEvent.position);
        }}
      >
        {meal.images.map((image) => (
          <CarouselItem
            key={image}
            source={image}
            contentFit="cover"
            classNames={{
              images: {
                root: "bg-neutral-400 rounded-[px] overflow-hidden",
                main: "w-full h-full",
              },
            }}
          />
        ))}
      </PagerView>
      {meal.images.length > 1 && (
        <CarouselIndicator
          itemsCount={meal.images.length}
          activeIndex={activeItem}
          onIndicatorPress={handleCarouselScroll}
        />
      )}

      {/* Meal Content */}
      <View className="px-4 mt-2">
        <Group>
          <Text className="text-xs text-neutral-500">{meal.likes} likes</Text>
          <View className="w-1 h-1 bg-primary rounded-full mx-1" />
          <Text className="text-xs text-neutral-500">
            {meal.deliveryTime} min delivery
          </Text>
        </Group>
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-text">{meal.name}</Text>

          {/* <ButtonIcon icon={<Feather name="heart" size={18} />} /> */}
          <Text className="text-text font-medium">ETB {meal.price}</Text>
        </View>

        <Group>
          <RattingWithRep ratting={meal.rating} withRatingNumber={false} />
          <Text className="text-neutral-600 ml-2">{meal.rating} Rating</Text>
        </Group>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          className="mt-4 pb-8 h-[160]"
        >
          <View>
            <Text className="text-base font-medium  text-text">
              Description
            </Text>
            <Text className="text-neutral-500">{meal.description}</Text>
          </View>
        </ScrollView>
      </View>

      <View className="mt-auto px-4 pt-2 pb-2 border border-neutral-200 bg-white rounded-t-[25px] ">
        <View className="flex-row justify-between items-center py-4 ">
          <View>
            <Text className="text-neutral-600">Cost</Text>
            <Text className="text-2xl font-semibold text-text">
              ETB {meal.price * (cart?.quantity || 0)}
            </Text>
          </View>
          <AddMealButton
            value={cart?.quantity}
            onIncrement={() => {
              incrementQuantity(meal.id, meal);
            }}
            onDecrement={() => decrementQuantity(meal.id)}
            classNames={{
              icon: "w-[40] h-[40]",
              count: "font-semibold text-lg mx-3",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Detail;
