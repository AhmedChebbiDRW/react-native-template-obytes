import { Redirect, router, SplashScreen } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import CustomButton from '@/components/custom/custom-button';
import { useAuth } from '@/core';
import { FocusAwareStatusBar, Image, ScrollView, Text, View } from '@/ui';
import { images } from '@/ui/constants';

export default function App() {
  const status = useAuth.use.status();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (status === 'signIn') {
    return <Redirect href="/home" />;
  }

  return (
    <View className="h-full bg-primary">
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="flex h-full w-full items-center justify-center px-4">
          <Image
            source={images.logo}
            className="h-[84px] w-[130px]"
            contentFit="contain"
          />

          <Image
            source={images.cards}
            className="h-[298px] w-full max-w-[380px]"
            contentFit="contain"
          />

          <View className="relative mt-5">
            <Text className="text-center text-3xl font-bold text-white">
              Discover Endless{'\n'}
              Possibilities with{' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="absolute -bottom-2 -right-8 h-[15px] w-[136px]"
              contentFit="contain"
            />
          </View>

          <Text className="mt-7 text-center font-pregular text-sm text-gray-100">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <FocusAwareStatusBar />
    </View>
  );
}
