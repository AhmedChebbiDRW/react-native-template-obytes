import React from 'react';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { icones } from '../../ui/constants';

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
  placeholder?: string;
}

const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="font-pmedium text-base text-gray-100">{title}</Text>
      <View className="bg-black-100 border-black-200 focus:border-secondary h-16 w-full flex-row items-center rounded-2xl border-2 px-4">
        <TextInput
          className="font-psemibold flex-1 text-sm text-white"
          placeholder={placeholder}
          value={value}
          placeholderTextColor={'#7b7b8b'}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          numberOfLines={1}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icones?.eyeHide : icones?.eye}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
