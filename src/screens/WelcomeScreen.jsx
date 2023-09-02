import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const insidePadding = useSharedValue(0);
  const outsidePadding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    insidePadding.value = 0;
    outsidePadding.value = 0;
    setTimeout(
      () => (insidePadding.value = withSpring(insidePadding.value + hp(5))),
      100
    );
    setTimeout(
      () => (outsidePadding.value = withSpring(outsidePadding.value + hp(5))),
      300
    );

    setTimeout(() => navigation.navigate("Home"), 1500);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="dark" />

      {/* Logo */}
      <Animated.View
        className=" bg-white/20 rounded-full"
        style={{
          padding: outsidePadding,
        }}
      >
        <Animated.View
          className=" bg-white/20 rounded-full"
          style={{
            padding: insidePadding,
          }}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{
              height: hp(20),
              width: hp(20),
            }}
          />
        </Animated.View>
      </Animated.View>
      {/* Title */}
      <View className="flex items-center space-y-2">
        <Text
          className=" font-bold text-white tracking-widest"
          style={{
            fontSize: hp(6),
          }}
        >
          Foodiee
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
