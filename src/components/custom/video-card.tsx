/* eslint-disable max-lines-per-function */
import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { icones } from '../../ui/constants';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
}

const VideoCard = ({
  title,
  thumbnail,
  creator: { avatar, username },
}: VideoCardProps) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="mb-14 flex-col items-center px-4">
      <View className="flex-row items-start gap-3">
        <View className="flex-1 flex-row items-center justify-center">
          <View className="border-secondary h-[46px] w-[46px] items-center justify-center rounded-lg border p-0.5">
            <Image
              source={{ uri: avatar }}
              className="h-full w-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="ml-3 flex-1 justify-center gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="font-pregular text-xs text-gray-100"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image
            source={icones.menu}
            className="h-5 w-5"
            resizeMode="contain"
          />
        </View>
      </View>
      {play ? (
        <Video
          source={{
            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          className="relative mt-3 h-60 w-full items-center justify-center rounded-xl"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          renderToHardwareTextureAndroid
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative mt-3 h-60 w-full items-center justify-center rounded-xl"
        >
          <Image
            source={{ uri: thumbnail }}
            className="mt-3 h-full w-full rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={icones.play}
            className="absolute h-12 w-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
