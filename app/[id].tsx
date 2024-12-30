import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams, useRouter } from "expo-router";
import PagerView from "react-native-pager-view";
import { CarouselIndicator, CarouselItem } from "@/components/carousel";

import { HeaderWithBackTab } from "@/components/header";
import { Group } from "@/components/layout";
import { RattingWithRep } from "@/components/ratting";
import AddMealButton from "@/components/add-meal-button";
import { useMeals } from "@/hooks/use-meals";
import { useCarts } from "@/hooks/use-cart";
import { StatusBar } from "expo-status-bar";
import { ButtonIcon } from "@/components/button";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const Detail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const carouselRef = useRef<PagerView | null>(null);
  const [activeItem, setActiveItem] = useState(0);
  const meals = useMeals((state) => state.meals);
  const { incrementQuantity, decrementQuantity, items } = useCarts();

  const [feedbacks, setFeedbacks] = useState<
    {
      username: string;
      feed: string;
      date: Date;
    }[]
  >([]);

  const [feedbackContent, setFeedbackContent] = useState("");
  const [isFeedModalOpended, setIsFeddModalOpened] = useState(false);

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
      <Modal
        visible={isFeedModalOpended}
        animationType="slide"
        // transparent

        onRequestClose={() => {}}
      >
        <View className="px-4 mt-4">
          <View className="flex flex-row justify-end">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setIsFeddModalOpened(false);
              }}
            >
              <MaterialIcons name="cancel" size={35} />
            </TouchableOpacity>
          </View>
          <View className="rounded-lg">
            <Text className="text-lg font-bold mb-2">Feedback</Text>
            <TextInput
              value={feedbackContent}
              onChange={(e) => {
                setFeedbackContent(e.nativeEvent.text);
              }}
              className="h-24 border border-gray-200 rounded-sm bg-white px-3 py-2"
              multiline
              placeholder="Write your feedback here..."
              placeholderTextColor="#A0A0A0"
              textAlignVertical="top"
            />
            <TouchableOpacity
              activeOpacity={0.75}
              className="bg-primary mt-4 py-2.5 rounded-full"
              onPress={() => {
                setIsFeddModalOpened(false);
                setFeedbacks([
                  {
                    username: "nesrucodex",
                    feed: feedbackContent,
                    date: new Date(),
                  },
                  ...feedbacks,
                ]);
                setFeedbackContent("");
              }}
            >
              <Text className="text-white text-center">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar translucent />
      <View className="absolute top-8 left-0 px-4 z-[99]">
        <HeaderWithBackTab
          // title={meal.name}
          rightComponent={
            <ButtonIcon
              classNames={{
                root: "bg-white/90",
              }}
              icon={<Feather name="heart" size={20} />}
            />
          }
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
          <RattingWithRep ratting={meal.rating} withRatingNumber={true} />
        </Group>

        <View>
          <Text className="text-base font-medium  text-text">Description</Text>
          <Text className="text-neutral-500">{meal.description}</Text>
        </View>

        <View className="mt-2">
          <View className="flex flex-row justify-between items-center border-b border-b-gray-200 pb-2 mb-2">
            <Text className="text-base font-medium  text-text">
              Customer Feedbacks
            </Text>
            <TouchableOpacity
              className="border-[1.4px] border-primary px-4 py-2 rounded-full"
              onPress={() => setIsFeddModalOpened(true)}
            >
              <Text className="text-xs">Add Feed</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
            {feedbacks.map((feedback, index) => {
              return <Feedback key={index} feedback={feedback} />;
            })}
          </ScrollView>
        </View>
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

type FeedbackProps = {
  feedback: {
    username: string;
    feed: string;
    date: Date;
  };
};

const Feedback = ({ feedback }: FeedbackProps) => {
  return (
    <View className="flex flex-row items-center border-b-gray-100  border-b pb-4">
      <View className="border w-[40] h-[40] border-primary-500 rounded-full mr-3 flex items-center justify-center">
        <Text className="font-bold bg-gray-100">
          {feedback.username[0].toUpperCase()}
        </Text>
      </View>
      <Text>{feedback.feed}</Text>
      <Text className="ml-auto text-gray-500 italic text-xs">
        {feedback.date.toLocaleString()}
      </Text>
    </View>
  );
};

export default Detail;
