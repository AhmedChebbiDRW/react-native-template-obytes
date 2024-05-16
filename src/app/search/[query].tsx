/* eslint-disable react/no-unstable-nested-components */
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import type { Models } from 'react-native-appwrite';

import { EmptyState } from '@/components/custom/empty-state';
import SearchInput from '@/components/custom/search-input';
import VideoCard from '@/components/custom/video-card';
import { searchPosts } from '@/core/lib/appwrite';
import useAppwrite from '@/core/lib/use-appwrite';
import { Text, View } from '@/ui';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite({
    fn: () => searchPosts(query as string),
  });

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  return (
    <View className="h-full bg-primary">
      <FlatList
        data={posts}
        className=""
        // estimatedItemSize={300}
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
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results :
            </Text>
            <Text className="font-psemibold text-2xl text-white">{query}</Text>
            <View className="mb-8 mt-6">
              <SearchInput initialQuery={query as string} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="No videos found for this query"
            btnTitle="Create video"
            href="/create"
          />
        )}
      />
    </View>
  );
};

export default Search;
