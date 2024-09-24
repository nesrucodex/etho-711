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
          root: "mb-10",
        }}
      />
      <View>
        <Text className="text-2xl font-semibold mb-4">
          Sign in to your account
        </Text>
        <Text className="text-neutral-600">
          Good to see you again, enter your details below to continue ordering.
        </Text>
      </View>

      <ScrollView className="mt-8">
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
        <Button>Sign In</Button>
        <Link href="/(auth)/sign-up" className="mt-4 text-neutral-600">
          If you don't have account,{" "}
          <Text className="text-primary">Sign up</Text>
        </Link>
        <Link
          // ts-ignore
          href={"/(auth)/forgot-password" as Href<string>}
          className="mt-2 text-neutral-600"
        >
          If you forgot your password,{" "}
          <Text className="text-primary">Reset password</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
