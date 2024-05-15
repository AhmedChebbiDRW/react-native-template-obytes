/* eslint-disable max-lines-per-function */
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, View } from 'react-native';

import CustomButton from '@/components/custom/custom-button';
import FormField from '@/components/custom/form-field';
import { useAuth } from '@/core';
import { getCurrentUser } from '@/core/lib/appwrite';
import { Image, Text } from '@/ui';
import { images } from '@/ui/constants';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { setUser, setIsLoggedIn } = useGlobalContext();
  const { signIn } = useAuth();

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert('Error', 'Please fill in all the fields');
    }
    try {
      setIsSubmitting(true);
      await signIn({ access: form.email, refresh: form.password });
      const result = await getCurrentUser();
      console.log('🚀 ~ handleSubmit ~ result:', result);

      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="my-6 min-h-[85vh] w-full justify-center px-4">
          <Image
            source={images?.logo}
            contentFit="contain"
            className="h-[35px] w-[115px]"
          />
          <Text className="font-psemibold mt-10 text-2xl text-white ">
            Log in to Aora
          </Text>
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
              Don&apos;t have an account?{' '}
            </Text>
            <Link
              href={'/sign-up'}
              className="font-psemibold text-secondary text-lg"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
