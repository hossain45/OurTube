import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
   return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#161622" }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center items-center px-4">
          <Image
            source={images.logo}
            resizeMethod="contain"
            className="w-[130px] h-[84px]"
          />
          <Image
            source={images.cards}
            resizeMethod="contain"
            className="max-w-[300px] w-full max-h-[300px]"
          />
          <View className="relative mt-5">
            <Text className="text-white text-2xl font-bold text-center">
              Dive into the ocean of Qur'an recitation with{" "}
              <Text className="text-secondary-200">QURAN TV</Text>
            </Text>
            <Image
              source={images.path}
              resizeMethod="contain"
              className="w-[136px] h-[15px] absolute -bottom-3 -right-4"
            />
          </View>
          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
