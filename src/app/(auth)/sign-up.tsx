import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, View } from 'react-native';

import CustomButton from '@/components/custom/custom-button';
import FormField from '@/components/custom/form-field';
import { signIn } from '@/core';
import { createUser } from '@/core/lib/appwrite';
import { Image, Text } from '@/ui';
import { images } from '@/ui/constants';

// eslint-disable-next-line max-lines-per-function
const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { setUser, setIsLoggedIn } = useGlobalContext();

  const handleSubmit = async () => {
    if (!form.email || !form.password || !form.username) {
      return Alert.alert('Error', 'Please fill in all the fields');
    }
    try {
      setIsSubmitting(true);
      const result = await createUser(form.username, form.email, form.password);
      signIn({ access: result.$id, refresh: result.$id });
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="my-6 h-full w-full justify-center px-4">
          <Image
            source={images.logo}
            contentFit="contain"
            className="h-[35px] w-[115px]"
          />
          <Text className="mt-10 font-psemibold text-2xl text-white ">
            Sign up
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            placeholder="Your unique username"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            placeholder="email-adress"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title={'Sign In'}
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">
              Already have an account?
            </Text>
            <Link
              href={'/sign-in'}
              className="font-psemibold text-lg text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
