/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable max-lines-per-function */
import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import type { Models } from 'react-native-appwrite';

import { EmptyState } from '@/components/custom/empty-state';
import SearchInput from '@/components/custom/search-input';
import Trending from '@/components/custom/trending-videos';
import VideoCard from '@/components/custom/video-card';
import { getAllPosts, getLatestPosts } from '@/core/lib/appwrite';
import useAppwrite from '@/core/lib/use-appwrite';
import { Image, Text, View } from '@/ui';
import { images } from '@/ui/constants';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  // const { user } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite({ fn: getAllPosts });
  const { data: latestPosts, refetch: refetchLatest } = useAppwrite({
    fn: getLatestPosts,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await refetchLatest();
    setRefreshing(false);
  };

  return (
    <View className="bg-primary h-full">
      <FlashList
        data={posts}
        keyExtractor={(item: Models.Document) => item.$id.toString()}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            prompt={item.prompt}
            video={item.video}
            creator={item.creator}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 space-y-6 px-4">
            <View className="mb-6 flex-row items-start justify-between">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {`user?.username`}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="h-10 w-9"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pb-8 pt-5">
              <Text className="font-pregular mb-3 text-lg text-gray-100">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="Be the first one to upload a video"
            btnTitle="Create video"
            href="/create"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Home;
