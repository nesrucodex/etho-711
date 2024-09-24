import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import Button from "@/components/button";

import { OtpInput } from "react-native-otp-entry";
import { Colors } from "@/constants";

const ResetPassword = () => {
  return (
    <SafeAreaView className="h-full bg-background px-4">
      <Header
        rightContent="Cancel"
        rightContentHref="/(auth)/sign-in"
        classNames={{
          root: "mb-10",
        }}
      />
      <View>
        <Text className="text-2xl font-semibold mb-4">Reset Password</Text>
        <Text className="text-neutral-600">
          A rest code has been sent to your email.
        </Text>
      </View>

      <View className="mt-8 px-2">
        <OtpInput
          numberOfDigits={5}
          type="numeric"
          theme={{
            containerStyle: {
              gap: 0,
              columnGap: 0,
            },
            pinCodeContainerStyle: { borderColor: Colors.light.text },
            focusedPinCodeContainerStyle: {
              borderColor: Colors.light.primary,
            },
          }}
          onTextChange={(text) => console.log(text)}
        />
      </View>
      <View className="mt-auto mb-8">
        <Button>Reset password</Button>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
