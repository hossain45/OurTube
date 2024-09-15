import { View, Text, FlatList, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { RefreshControl } from "react-native-gesture-handler";
import { getAllPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppWrite";
import VideoCard from "../../components/VideoCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Home = () => {
  const { data: posts } = useAppwrite(getAllPosts);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = async () => {
    setRefresh(true);
    // recall vdo -> if any new vdo apprears
    setRefresh(false);
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ height: "100%", backgroundColor: "#161622" }}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    Gawra rifat
                  </Text>
                </View>
                <View>
                  <Image
                    source={images.logo}
                    className="w-20 h-16"
                    resizeMethod="contain"
                  />
                </View>
              </View>

              <SearchInput placeholder="search a video" />

              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-lg font-pregular text-gray-100 mb-3">
                  Latest Videos
                </Text>

                {/* <Trending posts={latestPosts ?? []} /> */}
              </View>
            </View>
          )}
          ListEmptyComponent={() => <EmptyState title="No videos found!" />}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
