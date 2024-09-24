import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Button from "@/components/button";
import { Images } from "@/utils/assets";
import { useRouter } from "expo-router";

import MapView from "react-native-maps";

import Stepper from "react-native-stepper-ui";

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

  if (isEmptyOrder) return <EmptyOrder />;
  return (
    <SafeAreaView className="mt-2 h-full bg-background">
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
          <Text className="text-text/80">
            Arrives between{" "}
            <Text className="text-text font-medium">11:20PM-10:30AM</Text>
          </Text>

          <Stepper
            active={activeStep}
            content={ORDER_STATUS.map((status) => (
              <StepperStep
                key={status.title}
                title={status.title}
                description={status.description}
              />
            ))}
            onBack={() => {
              setActiveStep((prev) => prev - 1);
            }}
            onNext={() => {
              setActiveStep((prev) => prev + 1);
            }}
            onFinish={() => {}}
            showButton={false}
            stepStyle={{
              backgroundColor: "#000",
              borderColor: "#000",
            }}
            stepTextStyle={{
              fontSize: 14,
              fontWeight: "600",
              color: "white",
            }}
            wrapperStyle={{
              marginTop: 10,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

type StepperStepProps = {
  title: string;
  description: string;
};
const StepperStep = ({ title, description }: StepperStepProps) => {
  return (
    <View className="py-2">
      <Text className="text-lg text-text">{title}</Text>
      <Text className="text-text/80">{description}</Text>
    </View>
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
