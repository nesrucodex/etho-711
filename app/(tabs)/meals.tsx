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
import { Colors } from "@/constants";
import { cn } from "@/libs/cn";
import { EvilIcons, Feather, MaterialIcons } from "@expo/vector-icons";
import { ClassValue } from "clsx";
import { useRouter } from "expo-router";
import { Catagory, Meal } from "@/types/index";
import { ButtonIcon } from "@/components/button";
import { RattingWithRep } from "@/components/ratting";
import AddMealButton from "../../components/add-meal-button";
import { useMeals } from "@/hooks/use-meals";
import { useCarts } from "@/hooks/use-cart";
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
  const [isSearchInputOpened, setIsSearchInputOpened] = useState(false);
  const handleSearchInputVisibility = () => {
    setIsSearchInputOpened((prev) => !prev);
  };

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
        {!isSearchInputOpened && (
          <Text className="font-semibold text-xl text-primary">
            <MaterialIcons name="fastfood" size={30} color={"#111"} />
            Etho711
          </Text>
        )}
        <View className="flex-row items-center">
          <SearchInput
            isSearchInputOpened={isSearchInputOpened}
            onSearchInputVisibility={handleSearchInputVisibility}
            value={search}
            onSearchChange={handleSearchChange}
          />
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
          classNames={{
            root: "h-fit mt-8 px-4",
          }}
          description={`No meals found for '${activeCategory}' Category, '${search}' search term.`}
        />
      )}

      {!isFilteredMealsEmpty && (
        <FlatList
          data={filteredMeals}
          showsVerticalScrollIndicator={false}
          className="mb-[120px]"
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => (
            <View className="my-2 w-full h-[0.5px] bg-primary-200"></View>
          )}
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
                classNames={{
                  root: cn({ "mb-4": index < filteredMeals.length - 1 }),
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
  isSearchInputOpened: boolean;
  onSearchInputVisibility: () => void;
};

const SearchInput = ({
  isSearchInputOpened,
  value,
  onSearchChange,
  onSearchInputVisibility,
}: SearchInputProps) => {
  const isClearSearchShown = !!value;
  return (
    <>
      {!isSearchInputOpened ? (
        <ButtonIcon
          onPress={onSearchInputVisibility}
          icon={<Feather name="search" size={20} />}
        />
      ) : (
        <View className="flex-1 flex-row items-center justify-between pl-4 pr-2 py-2.5 border border-neutral-100 bg-white rounded overflow-hidden transition focus:border-primary">
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onSearchInputVisibility}
          >
            <EvilIcons name="search" size={28} color={Colors.light.primary} />
          </TouchableOpacity>
          <TextInput
            value={value}
            onChangeText={(text) => onSearchChange(text)}
            selectionColor={Colors.light.primary}
            className="mx-2 flex-1 bg-white"
            placeholder="Search your favorite meal?"
          />
          {isClearSearchShown && (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => onSearchChange("")}
            >
              <MaterialIcons
                name="cancel"
                size={20}
                color={Colors.light.primary}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
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
        "mr-4 flex-row justify-center items-center rounded-full pr-4 pl-2 py-2 bg-neutral-100",
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
        "relative flex-row rounded overflow-hidden",
        classNames?.root
      )}
    >
      <View className="w-[135] h-[135] mr-2">
        <Image
          source={{ uri: meal.images[0] }}
          className={cn("w-full h-full rounded-full", classNames?.image)}
          contentFit="cover"
        />
        <RattingWithRep
          ratting={meal.rating}
          classNames={{
            root: "absolute top-[10px] left-0 w-full z-[99]",
          }}
        />
      </View>

      <View className="flex-1 py-2">
        <Text className={cn("text-lg font-semibold", classNames?.name)}>
          {meal.name}
        </Text>
        <Text numberOfLines={2} className="">
          {meal.description}
        </Text>

        <View className="mt-auto flex-row justify-between items-center">
          <Text className={cn("font-medium", classNames?.price)}>
            ${meal.price}
          </Text>
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
      </View>
    </View>
  );
};

export default Meals;
