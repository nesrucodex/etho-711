import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { CATAGORIES, Colors } from "@/constants";
import { cn } from "@/libs/cn";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { ClassValue } from "clsx";
import { router, useRouter } from "expo-router";
import { Meal } from "@/types/index";
import { ButtonIcon } from "@/components/button";
import { RattingWithRep } from "@/components/ratting";
import AddMealButton from "../../components/add-meal-button";
import { useMeals } from "@/hooks/use-meals";
import { useCarts } from "@/hooks/use-cart";
import { neutral } from "@/utils";
import { Images } from "@/utils/assets";
import { LinearGradient } from "expo-linear-gradient";

const Meals = () => {
  const router = useRouter();
  const meals = useMeals((state) => state.meals);
  const [activeCategory, setActiveCategory] = useState(CATAGORIES[0].name);

  const handleCategorySelection = (category: string) => {
    setActiveCategory(category);
  };

  // Drived states
  let filteredMeals = meals;

  if (activeCategory !== "All")
    filteredMeals = meals.filter((meal) => meal.category === activeCategory);

  const isFilteredMealsEmpty = filteredMeals.length === 0;

  return (
    <SafeAreaView className="min-h-full px-4 bg-background pb-10">
      <Header />
      <FlatList
        data={filteredMeals}
        showsVerticalScrollIndicator={false}
        className="border-0 mb-20"
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: "/[id]",
                params: { id: item.id },
              })
            }
          >
            <MealCard
              meal={item}
              classNames={{
                root: "mb-4",
              }}
            />
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View>
            <Catagories
              onCategorySelection={handleCategorySelection}
              activeCategory={activeCategory}
            />
            <View>
              {isFilteredMealsEmpty && (
                <EmptyMeals activeCategory={activeCategory} />
              )}
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const Header = () => {
  return (
    <View className="mb-4 mt-2">
      <View className="mb-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Image
            source={Images.Logo}
            contentFit="contain"
            className="w-[35] h-[35]"
          />
          <Text className="text-2xl ml-2 font-semibold  text-text">Etho 711</Text>
        </View>

        {/* Right sections */}
        <View className="flex-row items-center">
          <ButtonIcon
            onPress={() => router.push("/(tabs)/notifications")}
            icon={
              <View className="relative">
                <Feather name="bell" size={20} />
                <View className="absolute w-2 h-2 rounded-full top-0 right-0 bg-red-500" />
              </View>
            }
          />
        </View>
      </View>

      <SearchInput />
    </View>
  );
};

const SearchInput = () => {
  return (
    <View className="flex-row items-center px-4 py-2.5 border border-neutral-100 bg-white rounded-full overflow-hidden transition focus:border-primary">
      <EvilIcons name="search" size={25} color={neutral(0.4, true)} />
      <TextInput
        selectionColor={Colors.light.primary}
        className="ml-2 bg-white"
        placeholder="Search your favorite meal?"
      />
    </View>
  );
};

type CatagoriesProps = {
  activeCategory: string;
  onCategorySelection: (category: string) => void;
};

const Catagories = ({
  activeCategory,
  onCategorySelection,
}: CatagoriesProps) => {
  return (
    <FlatList
      data={CATAGORIES}
      keyExtractor={(item) => item.name}
      className="mb-6"
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => onCategorySelection(item.name)}
        >
          <CategoryItem
            isActive={item.name === activeCategory}
            name={item.name}
            icon={item.icon}
          />
        </TouchableOpacity>
      )}
    />
  );
};

type CategoryItemProps = {
  icon: string;
  name: string;
  isActive?: boolean;
};
const CategoryItem = ({ name, icon, isActive = false }: CategoryItemProps) => {
  return (
    <View
      className={cn(
        "mr-4 flex-row items-center rounded-full pl-2 pr-4 py-1 bg-neutral-50 border border-neutral-100",
        {
          "bg-primary": isActive,
        }
      )}
    >
      <View
        className={cn(
          "mr-2 items-center justify-center rounded-full w-[30] h-[30] mb-1 bg-neutral-200",
          {
            "bg-white": isActive,
          }
        )}
      >
        <Text className={"text-[20px]"}>{icon}</Text>
      </View>
      <Text
        className={cn("text-xs font-medium", {
          "text-white": isActive,
        })}
      >
        {name}
      </Text>
    </View>
  );
};

type MealCardProps = {
  meal: Meal;
  classNames?: {
    root?: ClassValue;
    image?: ClassValue;
    name?: ClassValue;
    description?: ClassValue;
    ratting?: ClassValue;
    price?: ClassValue;
  };
};
const MealCard = ({ meal, classNames }: MealCardProps) => {
  const { items, incrementQuantity, decrementQuantity } = useCarts();
  const quantity = items.find((item) => item.meal.id === meal.id)?.quantity;

  return (
    <View
      className={cn(
        "relative w-full rounded-[20px] overflow-hidden",
        classNames?.root
      )}
    >
      <View className="absolute top-0 right-0 z-[99]">
        <AddMealButton
          value={quantity}
          onIncrement={() => incrementQuantity(meal.id, meal)}
          onDecrement={() => decrementQuantity(meal.id)}
        />
      </View>
      <Image
        source={{ uri: meal.images[0] }}
        className={cn("w-full aspect-[7/5] mx-auto ", classNames?.image)}
        contentFit="cover"
      />

      <LinearGradient
        colors={["transparent", "#333", "#000"]}
        className="absolute left-0 bottom-0 w-full px-4 py-5 "
      >
        <View className="mb-1 flex-row justify-between items-start">
          <Text
            className={cn("text-lg font-semibold text-white", classNames?.name)}
          >
            {meal.name}
          </Text>
          <Text
            className={cn("mt-2 font-medium text-white", classNames?.price)}
          >
            ETB {meal.price}
          </Text>
        </View>

        <RattingWithRep
          ratting={meal.rating}
          rightComponent={
            <Text className="ml-1 font-medium text-white">{meal.rating}</Text>
          }
        />
      </LinearGradient>
    </View>
  );
};

type EmptyMealsProps = {
  activeCategory: string;
};
const EmptyMeals = ({ activeCategory }: EmptyMealsProps) => {
  return (
    <View className="mt-10 flex-1 flex-col items-center justify-center">
      <Image
        source={Images.Empty}
        contentFit="contain"
        className="w-[150] h-[150]"
      />
      <Text className="w-[80%] mt-6 text-center text-lg font-semibold text-neutral-700">
        No meals found for "{activeCategory}" Category
      </Text>
    </View>
  );
};

export default Meals;
