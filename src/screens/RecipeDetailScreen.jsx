import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "../helpers/image";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon, ClockIcon } from "react-native-heroicons/outline";
import {
  FireIcon,
  HeartIcon,
  UsersIcon,
  Square3Stack3DIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function RecipeDetailScreen(props) {
  const item = props.route.params;
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [recipeData, setRecipeData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getData(item.idMeal);
  }, []);

  const getData = async (id) => {
    const response = await axios.get(
      `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (response && response.data) {
      // console.log(response.data.meals);
      setRecipeData(response.data.meals[0]);
      setLoading(false);
    }
  };

  const ingredientsIndices = (meal) => {
    if (!meal) return [];
    const indices = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) indices.push(i);
    }

    return indices;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />

      <View className="flex-row justify-center">
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{
            height: hp(50),
            width: wp(98),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>

      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row justify-between items-center pt-14"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-5 bg-white"
        >
          <ChevronLeftIcon size={hp(2.5)} color="#fbbf24" strokeWidth={4.5} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavorite((prev) => !prev)}
          className="p-2 rounded-full bg-white mr-5"
        >
          <HeartIcon
            size={hp(2.5)}
            color={isFavorite ? "red" : "gray"}
            strokeWidth={4.5}
          />
        </TouchableOpacity>
      </Animated.View>

      {loading ? (
        <Loading size="large" className="mt-20" />
      ) : (
        <Animated.View
          entering={FadeInDown.delay(500)
            .duration(1000)
            .springify()
            .damping(12)}
          className="px-4 flex justify-between space-y-4 pt-5"
        >
          <View className="space-y-2">
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{
                fontSize: hp(3),
              }}
            >
              {recipeData?.strMeal}
            </Text>
            <Text
              className="font-medium flex-1 text-neutral-500"
              style={{
                fontSize: hp(2),
              }}
            >
              {recipeData?.strArea}
            </Text>

            <View className="flex-row justify-evenly">
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{
                    height: hp(5),
                    width: hp(5),
                  }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <ClockIcon size={hp(4)} strokeWidth={2} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{
                      fontSize: hp(1.5),
                    }}
                    className="font-bold text-neutral-700"
                  >
                    35
                  </Text>
                  <Text
                    style={{
                      fontSize: hp(1.1),
                    }}
                    className="font-bold text-neutral-700"
                  >
                    Mins
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{
                    height: hp(5),
                    width: hp(5),
                  }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <UsersIcon size={hp(4)} strokeWidth={2} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{
                      fontSize: hp(1.5),
                    }}
                    className="font-bold text-neutral-700"
                  >
                    03
                  </Text>
                  <Text
                    style={{
                      fontSize: hp(1.1),
                    }}
                    className="font-bold text-neutral-700"
                  >
                    Servings
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{
                    height: hp(5),
                    width: hp(5),
                  }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <FireIcon size={hp(4)} strokeWidth={2} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{
                      fontSize: hp(1.5),
                    }}
                    className="font-bold text-neutral-700"
                  >
                    126
                  </Text>
                  <Text
                    style={{
                      fontSize: hp(1.1),
                    }}
                    className="font-bold text-neutral-700"
                  >
                    Calories
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{
                    height: hp(5),
                    width: hp(5),
                  }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <Square3Stack3DIcon
                    size={hp(4)}
                    strokeWidth={2}
                    color="#525252"
                  />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{
                      fontSize: hp(1.5),
                    }}
                    className="font-bold text-neutral-700"
                  >
                    Easy
                  </Text>
                  <Text
                    style={{
                      fontSize: hp(1.1),
                    }}
                    className="font-bold text-neutral-700"
                  >
                    to make
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="space-y-4">
            <Text
              className="font-bold text-neutral-700 flex-1"
              style={{
                fontSize: hp(2.1),
              }}
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndices(recipeData).map((index) => {
                return (
                  <View key={index} className="flex-row space-x-4">
                    <View
                      style={{
                        height: hp(1.5),
                        width: hp(1.5),
                      }}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-1">
                      <Text
                        style={{
                          fontSize: hp(1.5),
                        }}
                        className="font-extrabold text-neutral-700"
                      >
                        {recipeData[`strMeasure${index}`]}
                      </Text>
                      <Text
                        style={{
                          fontSize: hp(1.5),
                        }}
                        className="font-medium text-neutral-600"
                      >
                        {recipeData[`strIngredient${index}`]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <View className="space-y-4 mt-5">
            <Text
              className="font-bold text-neutral-700 flex-1"
              style={{
                fontSize: hp(2.1),
              }}
            >
              Instructions
            </Text>
            <Text
              style={{
                fontSize: hp(1.6),
              }}
              className=" text-neutral-700"
            >
              {recipeData?.strInstructions}
            </Text>
          </View>

          {recipeData?.strYoutube && (
            <View className="space-y-4">
              <Text
                className="font-bold text-neutral-700 flex-1"
                style={{
                  fontSize: hp(2.1),
                }}
              >
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(recipeData?.strYoutube)}
                  height={hp(25)}
                />
              </View>
            </View>
          )}
        </Animated.View>
      )}
    </ScrollView>
  );
}
