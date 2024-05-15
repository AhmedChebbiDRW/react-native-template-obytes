import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { icons } from '../../ui/constants';

export interface Data {
  $id: number;
  [key: string]: any;
}

interface TrendingProps {
  posts: Data[] | [];
}
interface TrendingItemProps {
  activeItem: number;
  item: Data;
}

const zoomIn = {
  0: {
    opacity: 1.2,
    scale: 0.9,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};
const zoomOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  1: {
    opacity: 1.2,
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item?.$id ? zoomIn : zoomOut}
    >
      {play ? (
        <Video
          source={{
            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          className="mt-3 h-72 w-52 rounded-[35px] bg-white/10"
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
          className="relative items-center justify-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="my-5 h-72 w-52 overflow-hidden rounded-[35px] shadow-lg shadow-black/50"
          />
          <Image
            source={icons.play}
            className="absolute h-12 w-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState<number>(posts[1]?.$id);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item: Data) => item.$id.toString()}
      renderItem={({ item }: { item: Data }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{
        x: 170,
        y: 0,
      }}
      horizontal
    />
  );
};

export default Trending;
