/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, RefreshControl } from 'react-native';
import type { Models } from 'react-native-appwrite';

import { EmptyState } from '@/components/custom/empty-state';
import InfoBox from '@/components/custom/info-box';
import VideoCard from '@/components/custom/video-card';
import { getUserPosts, signOut } from '@/core/lib/appwrite';
import useAppwrite from '@/core/lib/use-appwrite';
import { FocusAwareStatusBar, Image, TouchableOpacity, View } from '@/ui';
import { icones } from '@/ui/constants';

import { images } from '../../ui/constants';

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);

  // const { signIn, status } = useAuth();

  const { data: posts, refetch } = useAppwrite({
    fn: () => getUserPosts('6639e99600022d8ba8de'),
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const logout = async () => {
    try {
      signOut();
      router.replace('/sign-in');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="h-full bg-primary">
      <FocusAwareStatusBar />
      <FlatList
        className=""
        data={posts}
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
          <View className="mb-12 mt-6 w-full items-center justify-center px-4">
            <TouchableOpacity
              className="mb-10 w-full items-end"
              onPress={logout}
            >
              <Image
                source={icones?.logout}
                contentFit="contain"
                className="h-6 w-6"
              />
            </TouchableOpacity>
            <View className="h-16 w-16 items-center justify-center rounded-lg border border-secondary">
              <Image
                source={images.profile}
                contentFit="cover"
                className="h-[90%] w-[90%] rounded-lg"
              />
            </View>
            <InfoBox
              title={'user?.username || user?.email'}
              titleStyles={'mt-5'}
              containerStyles={'text-lg'}
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title={posts?.length || 0}
                subtitle="Posts"
                titleStyles={'text-xl'}
                containerStyles={'mr-10'}
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles={'text-xl'}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="No videos found for this profile"
            btnTitle="Back to Explore"
            href="/home"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Profile;
