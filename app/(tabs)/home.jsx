import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/search-input";
import Tranding from "../../components/tranding";
import EmptyState from "../../components/empty-state";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";
import VideoCard from "../../components/video-card";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const {data : posts ,refetch} = useAppWrite(getAllPosts)
  const {data : latestPost } = useAppWrite(getLatestPosts)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch()
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
          video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username ?? "User"}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  className="w-9 h-10"
                  resizeMode="contain"
                  source={images.logoSmall}
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Tranding posts={latestPost ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be The first one to upload a Video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
