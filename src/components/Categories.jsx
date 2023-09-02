import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CachedImage } from "../helpers/image";

export default function Categories({
  activeCategory,
  setActiveCategory,
  categories,
  handleChangeCategory,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-1"
              onPress={() => handleChangeCategory(category.strCategory)}
            >
              <View className="rounded-full p-[6px]">
                <CachedImage
                  uri={category.strCategoryThumb}
                  style={{
                    height: hp(6),
                    width: hp(6),
                    borderWidth: 3,
                    borderColor:
                      activeCategory === category.strCategory
                        ? "#F59E0B"
                        : "rgba(255,255,255,0.3)",
                  }}
                  className="rounded-full object-contain "
                />
              </View>
              <Text
                className="text-neutral-600"
                style={{
                  fontSize: hp(1.5),
                }}
              >
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
