import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import Input from "@/components/input";
import Button from "@/components/button";
import { Link } from "expo-router";

const SignUp = () => {
  return (
    <SafeAreaView className="px-4 h-full bg-background">
      <Header
        classNames={{
          root: "mb-10",
        }}
      />
      <View>
        <Text className="text-2xl font-semibold mb-4">Create an account</Text>
        <Text className="text-neutral-600">
          Welcome friend, enter your details so lets get started in ordering
          food.
        </Text>
      </View>

      <ScrollView className="mt-8">
        <Input
          placeholder="nesru@gmail.com"
          label="Email Address"
          classNames={{ root: "mb-3" }}
        />
        <Input
          placeholder="096287****"
          label="Phone number"
          classNames={{ root: "mb-3" }}
          keyboardType="phone-pad"
        />
        <Input
          placeholder="********"
          label="Password"
          classNames={{ root: "mb-3" }}
          secureTextEntry
        />
        <Input
          placeholder="********"
          label="Confirm Password"
          secureTextEntry
        />
      </ScrollView>
      <View className="mt-auto pt-4 mb-8">
        <Button>Sign Up</Button>
        <Link href="/(auth)/sign-in" className="mt-4 text-neutral-600">
          If you already have account,{" "}
          <Text className="text-primary">Sign In</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
