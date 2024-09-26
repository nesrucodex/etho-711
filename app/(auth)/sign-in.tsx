import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import Input from "@/components/input";
import Button from "@/components/button";
import { Href, Link } from "expo-router";

const SignIn = () => {
  return (
    <SafeAreaView className="px-4 h-full bg-background">
      <Header
        classNames={{
          root: "mb-4",
        }}
      />
      <View className="mb-4">
        <Text className="text-2xl font-semibold">Sign in to your account</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          placeholder="nesru@gmail.com"
          label="Email Address"
          classNames={{ root: "mb-3" }}
        />

        <Input
          placeholder="********"
          label="Password"
          classNames={{ root: "mb-3" }}
          secureTextEntry
        />
      </ScrollView>
      <View className="mt-auto mb-8">
        <Button
          classNames={{
            root: "mb-2",
          }}
        >
          Sign In
        </Button>
        <Text>
          If you don't have account,{" "}
          <Link href="/(auth)/sign-up" className="text-primary">
            sign up.
          </Link>{" "}
          If you forgot your password,{" "}
          <Link
            href={"/(auth)/forgot-password" as Href<string>}
            className="text-primary"
          >
            reset password.
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
