import { Text, View } from "react-native";

type AvatarProps = {
  fallback: string;
};
const Avatar = ({ fallback }: AvatarProps) => {
  return (
    <View className="bg-accent/80 w-[35] h-[35] rounded-full items-center justify-center">
      <Text className="uppercase font-semibold text-white">{fallback}</Text>
    </View>
  );
};

export default Avatar;
