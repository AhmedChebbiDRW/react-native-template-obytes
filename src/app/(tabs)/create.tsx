/* eslint-disable max-lines-per-function */
import { ResizeMode, Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import CustomButton from '@/components/custom/custom-button';
import FormField from '@/components/custom/form-field';
import type { VideoForm } from '@/core/lib/appwrite';
import { createVideo } from '@/core/lib/appwrite';
import { Image, Text } from '@/ui';
import { icones } from '@/ui/constants';

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<VideoForm>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  // const { user } = useGlobalContext();

  const openPicker = async (selectType: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === 'image'
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const handleSubmit = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert('Error', 'Please fill in all the fields');
    }
    try {
      setUploading(true);
      await createVideo({ ...form, userId: '6639e99600022d8ba8de' });

      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="my-6 px-4">
        <Text className="font-psemibold text-2xl text-white">Upload Video</Text>
        <FormField
          title={'Video title'}
          value={form.title}
          placeholder="Give yourt video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="font-pmedium text-base text-gray-100">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
                source={{
                  uri: form.video.uri,
                }}
                className="h-64 w-full rounded-2xl "
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="bg-black-100 h-40 w-full items-center justify-center rounded-2xl px-4">
                <View className="border-secondary-100 h-14 w-14 items-center justify-center border border-dashed">
                  <Image
                    source={icones?.upload}
                    className="h-1/2 w-1/2"
                    contentFit="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="font-pmedium text-base text-gray-100">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{
                  uri: form.thumbnail.uri,
                }}
                contentFit="cover"
                className="h-64 w-full rounded-2xl "
              />
            ) : (
              <View className="bg-black-100 border-black-200 h-16 w-full flex-row items-center justify-center space-x-2 rounded-2xl border-2 px-4">
                <Image
                  source={icones.upload}
                  className="h-5 w-5"
                  contentFit="contain"
                />
                <Text className="font-pmedium text-sm text-gray-100">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title={'AI Prompt'}
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title={'Submit & Publish'}
          handlePress={handleSubmit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
