import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import Input from "@/components/input";
import Button from "@/components/button";
import { Href, useRouter } from "expo-router";

const ForgotPassword = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="h-full bg-background px-4">
      <Header
        rightContent="Cancel"
        rightContentHref="/(auth)/sign-in"
        classNames={{
          root: "mb-4",
        }}
      />
      <View className="mb-4">
        <Text className="text-2xl font-semibold mb-2">Forgot Password</Text>
        <Text className="text-neutral-600">
          Enter your email address to request a password reset.
        </Text>
      </View>

      <View>
        <Input
          placeholder="nesru@gmail.com"
          label="Email Address"
          classNames={{ root: "mb-3" }}
        />
      </View>
      <View className="mt-auto mb-8">
        <Button
          onPress={() => router.push("/(auth)/reset-password" as Href<string>)}
        >
          Reset password
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
