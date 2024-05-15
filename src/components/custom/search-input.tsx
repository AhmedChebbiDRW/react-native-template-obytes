import { router, usePathname } from 'expo-router';
import React from 'react';
import { useState } from 'react';
import { Alert, Image, TextInput, TouchableOpacity, View } from 'react-native';

import { icons } from '../../ui/constants';

interface FormFieldProps {
  initialQuery?: string;
}

const SearchInput = ({ initialQuery }: FormFieldProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View className="bg-black-100 border-black-200 focus:border-secondary h-16 w-full flex-row items-center space-x-4 rounded-2xl border-2 px-4">
      <TextInput
        className="font-pregular mt-0.5 flex-1 text-base text-white"
        placeholder={'Search for a video topic'}
        value={query}
        placeholderTextColor={'#CDCDE0'}
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              'Missing query',
              'Please input something to search results across database'
            );
          }
          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            //@ts-ignore
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
