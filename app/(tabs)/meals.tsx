import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Colors } from "@/constants";
import { cn } from "@/libs/cn";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { ClassValue } from "clsx";
import { useRouter } from "expo-router";
import { Catagory, Meal } from "@/types/index";
import { ButtonIcon } from "@/components/button";
import { RattingWithRep } from "@/components/ratting";
import AddMealButton from "../../components/add-meal-button";
import { useMeals } from "@/hooks/use-meals";
import { useCarts } from "@/hooks/use-cart";
import { Images } from "@/utils/assets";
import { LinearGradient } from "expo-linear-gradient";
import { useDebounce } from "use-debounce";
import EmptyList from "@/components/empty-list";

const ALL_CATEGORY: Catagory = {
  id: "000",
  name: "All",
  imojji: "😋",
};

const Meals = () => {
  const router = useRouter();
  const meals = useMeals((state) => state.meals);
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 1000);

  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY.name);

  // Event handlers
  const handleCategorySelection = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  // Drived states
  let filteredMeals = meals;
  const categories = [ALL_CATEGORY, ...meals.map((meal) => meal.category)];

  if (activeCategory !== ALL_CATEGORY.name)
    filteredMeals = meals.filter(
      (meal) => meal.category.name === activeCategory
    );

  if (searchValue)
    filteredMeals = filteredMeals.filter((meal) =>
      meal.name.toLowerCase().includes(searchValue.toLowerCase())
    );

  const isFilteredMealsEmpty = filteredMeals.length === 0;

  return (
    <SafeAreaView className="mt-2 min-h-full px-4 bg-background pb-10">
      {/* <Header /> */}
      <View className="mb-4 flex-row justify-between items-center">
        <SearchInput value={search} onSearchChange={handleSearchChange} />
        <ButtonIcon
          classNames={{
            root: "ml-2",
          }}
          onPress={() => router.push("/(tabs)/notifications")}
          icon={
            <View className="relative">
              <Feather name="bell" size={20} />
              <View className="absolute w-2 h-2 rounded-full top-0 right-0 bg-red-500" />
            </View>
          }
        />
      </View>
      <View>
        <Catagories
          categories={categories}
          onCategorySelection={handleCategorySelection}
          activeCategory={activeCategory}
        />
      </View>

      {isFilteredMealsEmpty && (
        <EmptyList
          description={`No meals found for '${activeCategory}' Category, '${search}' search
        term.`}
        />
      )}

      {!isFilteredMealsEmpty && (
        <FlatList
          data={filteredMeals}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
          keyExtractor={({ id }) => id}
          alwaysBounceHorizontal
          centerContent
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() =>
                router.push({
                  pathname: "/[id]",
                  params: { id: item.id },
                })
              }
            >
              <MealCard
                meal={item}
                isFullWidth={filteredMeals.length === 1}
                classNames={{
                  root: cn({ "mr-4": index < filteredMeals.length - 1 }),
                }}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

type SearchInputProps = {
  onSearchChange: (value: string) => void;
  value: string;
};

const SearchInput = ({ value, onSearchChange }: SearchInputProps) => {
  return (
    <View className="flex-1 flex-row items-center px-4 py-2.5 border border-neutral-100 bg-white rounded overflow-hidden transition focus:border-primary">
      <EvilIcons name="search" size={28} color={Colors.light.primary} />
      <TextInput
        value={value}
        onChangeText={(text) => onSearchChange(text)}
        selectionColor={Colors.light.primary}
        className="ml-2 bg-white"
        placeholder="Search your favorite meal?"
      />
    </View>
  );
};

type CatagoriesProps = {
  activeCategory: string;
  categories: Catagory[];
  onCategorySelection: (category: string) => void;
};

const Catagories = ({
  categories,
  activeCategory,
  onCategorySelection,
}: CatagoriesProps) => {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
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
            imojji={item.imojji}
          />
        </TouchableOpacity>
      )}
    />
  );
};

type CategoryItemProps = {
  imojji: string;
  name: string;
  isActive?: boolean;
};
const CategoryItem = ({
  name,
  imojji,
  isActive = false,
}: CategoryItemProps) => {
  return (
    <View
      className={cn(
        "mr-4 flex-row justify-center items-center rounded pr-4 pl-2 py-2 bg-neutral-100 border",
        {
          "bg-primary": isActive,
        }
      )}
    >
      <View
        className={cn(
          "items-center justify-center rounded-full mr-2 w-[30] h-[30] bg-neutral-200",
          {
            "bg-white": isActive,
          }
        )}
      >
        <Text className={"text-[20px]"}>{imojji}</Text>
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
  isFullWidth?: boolean;
  classNames?: {
    root?: ClassValue;
    image?: ClassValue;
    name?: ClassValue;
    description?: ClassValue;
    ratting?: ClassValue;
    price?: ClassValue;
  };
};
const MealCard = ({ meal, isFullWidth, classNames }: MealCardProps) => {
  const { items, incrementQuantity, decrementQuantity } = useCarts();
  const quantity = items.find((item) => item.meal.id === meal.id)?.quantity;
  const { width, height } = useWindowDimensions();

  return (
    <View
      className={cn(
        "relative h-[calc(70vh)] rounded overflow-hidden",
        classNames?.root
      )}
      style={{ width: isFullWidth ? width - 32 : (width - 32) * 0.9 }}
    >
      <View className="absolute top-0 right-0 z-[99]">
        <AddMealButton
          classNames={{
            root: "rounded-full oveflow-hidden",
            icon: "rounded-full",
          }}
          // withMinus={false}
          value={quantity}
          onIncrement={() => incrementQuantity(meal.id, meal)}
          onDecrement={() => decrementQuantity(meal.id)}
        />
      </View>
      <Image
        source={{ uri: meal.images[0] }}
        className={cn("w-full h-full mx-auto ", classNames?.image)}
        contentFit="cover"
      />

      <LinearGradient
        colors={["transparent", "#333", "#000"]}
        className="absolute left-0 bottom-0 w-full px-4 pb-4 pt-6 "
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

export default Meals;
