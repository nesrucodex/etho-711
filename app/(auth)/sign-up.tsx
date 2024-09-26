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
          root: "mb-4",
        }}
      />
      <View className="mb-4">
        <Text className="text-2xl font-semibold">Create an account</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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
      </ScrollView>
      <View className="mt-auto mb-8">
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
