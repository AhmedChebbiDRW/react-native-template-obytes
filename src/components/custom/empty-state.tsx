import { router } from 'expo-router';
import React from 'react';

import { Image, Text, View } from '@/ui';

import { images } from '../../ui/constants';
import CustomButton from './custom-button';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  btnTitle: string;
  href: string | any;
}

export const EmptyState = ({
  title,
  subtitle,
  btnTitle,
  href,
}: EmptyStateProps) => {
  return (
    <View className="items-center justify-center px-4">
      <Image
        source={images.empty}
        contentFit="contain"
        className="h-[215px] w-[270px]"
      />
      <Text className="font-psemibold mt-2 text-center text-xl text-white">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <CustomButton
        title={btnTitle || 'Create video'}
        handlePress={() => router.push(href)}
        containerStyles="w-full my-5"
      />
    </View>
  );
};
