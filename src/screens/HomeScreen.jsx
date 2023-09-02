import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";

const HomeScreen = () => {
  const [categories, setCategories] = React.useState([]);
  const [recipes, setRecipes] = React.useState([]);
  const [activeCategory, setActiveCategory] = React.useState("Vegetarian");

  useEffect(() => {
    getCategories();
    getRecipe();
  }, []);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    getRecipe(category);
    setRecipes([]);
  };

  const getCategories = async () => {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    if (response && response.data) {
      setCategories(response.data.categories);
    }
  };

  const getRecipe = async (category = "Vegetarian") => {
    const response = await axios.get(
      `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    if (response && response.data) {
      // console.log(response.data.meals);
      setRecipes(response.data.meals);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        className="pt-14 space-y-6"
      >
        {/* Avatar */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{
              height: hp(6),
              width: hp(6),
            }}
            className=" object-contain"
          />
          <BellIcon size={hp(4)} />
        </View>

        {/* Greetings */}
        <View className="mx-4 space-y-2 mb-2">
          <View>
            <Text
              style={{
                fontSize: hp(3.5),
              }}
              className="font-semibold text-neutral-600"
            >
              Make your own food,
            </Text>
          </View>
          <Text
            className="font-semibold text-neutral-600"
            style={{
              fontSize: hp(3.5),
            }}
          >
            stay at <Text className="text-amber-500">home</Text>
          </Text>
        </View>

        {/* Search */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search for a recipe..."
            placeholderTextColor={"gray"}
            style={{
              fontSize: hp(1.5),
            }}
            className="flex-1 text-base pl-3 tracking-wider mb-2 "
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>

        {/* Categories */}
        <View>
          {categories?.length > 0 && (
            <Categories
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              categories={categories}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* Recipes */}
        <View>
          <Recipes recipes={recipes} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
