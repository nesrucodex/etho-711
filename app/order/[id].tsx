import { View, Text, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Button from "@/components/button";
import { Images } from "@/utils/assets";
import { router, useRouter } from "expo-router";
import StepIndicator from "react-native-step-indicator";
import MapView from "react-native-maps";
import { HeaderWithBackTab } from "@/components/header";
import { Colors } from "@/constants";
import { neutral } from "@/utils";

const ORDER_STATUS = [
  {
    title: "Order placed",
    description: "Your order has been confirmed and is being processed.",
  },
  {
    title: "Meal preparation",
    description: "The kitchen is cooking your meal with fresh ingredients.",
  },
  {
    title: "On the way",
    description: "Your meal is packed and on its way to your location.",
  },
];

const Order = () => {
  const isEmptyOrder = false;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (activeStep + 1 < ORDER_STATUS.length) setActiveStep(activeStep + 1);
      else setActiveStep(0);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [activeStep]);

  if (isEmptyOrder) return <EmptyOrder />;
  return (
    <SafeAreaView className=" h-full bg-background">
      <View className="absolute top-8 left-4 z-[99]">
        <HeaderWithBackTab onBackPress={() => router.back()} />
      </View>
      <MapView
        className="w-full h-full"
        mapType="mutedStandard"
        showsUserLocation
        zoomEnabled
        showsCompass
        initialRegion={{
          latitude: 9.03,
          longitude: 38.74,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View className="absolute -bottom-1 left-0 w-[100%]">
        <View className="bg-white w-full px-4 pb-6 py-8 rounded-t-[20px] mx-auto">
          <Text className="mb-1 text-xl font-semibold text-text">
            Preparing your order
          </Text>
          <Text className="text-neutral-500 mb-2">
            Arrives between <Text className="text-text">11:20PM - 10:30AM</Text>
          </Text>
          <StepIndicator
            labels={ORDER_STATUS.map((status) => status.title)}
            stepCount={ORDER_STATUS.length}
            currentPosition={activeStep}
            customStyles={{
              currentStepLabelColor: Colors.light.primary,
              stepStrokeCurrentColor: Colors.light.primary,
              labelColor: neutral(0.7, true),
              stepIndicatorFinishedColor: Colors.light.primary,
              stepIndicatorUnFinishedColor: Colors.light.primary,
              currentStepIndicatorSize: 35,
              stepIndicatorSize: 35,
              separatorFinishedColor: Colors.light.primary,
              separatorUnFinishedColor: neutral(0.1, true),
              currentStepIndicatorLabelFontSize: 14,
              stepIndicatorLabelFontSize: 14,
              stepIndicatorLabelCurrentColor: Colors.light.primary,
              stepIndicatorCurrentColor: "white",
            }}
          />
          <View className="px-4">
            <StepperStep
              onPress={() => {
                Alert.alert(activeStep + "");
              }}
              description={ORDER_STATUS[activeStep].description}
              title={ORDER_STATUS[activeStep].title}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

type StepperStepProps = {
  title: string;
  description?: string;
  onPress: () => void;
};
const StepperStep = ({ title, description, onPress }: StepperStepProps) => {
  return (
    <Pressable className="py-2" onPress={onPress}>
      <Text className="text-lg text-text">{title}</Text>
      {description && <Text className="text-text/80">{description}</Text>}
    </Pressable>
  );
};

const EmptyOrder = () => {
  const router = useRouter();
  return (
    <View className="h-full bg-background items-center justify-center px-8">
      <View className="w-full">
        <Image
          source={Images.Empty}
          className="w-[50%] aspect-[1/1] mx-auto"
          contentFit="contain"
        />
        <View className="mt-8">
          <Text className="text-center text-lg font-semibold text-neutral-700">
            Your orders are empty, no items added yet.
          </Text>

          <Button
            classNames={{ root: "w-[60%] mt-12 mx-auto" }}
            onPress={() => router.push("/(tabs)/meals")}
          >
            Add Meals
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Order;
