import React from 'react';

import { Text, View } from '@/ui';

interface InfoBoxProps {
  title: string | number;
  subtitle?: string;
  titleStyles?: string;
  containerStyles?: string;
}

const InfoBox = ({
  title,
  subtitle,
  titleStyles,
  containerStyles,
}: InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <Text className={`font-psemibold text-center text-white ${titleStyles}`}>
        {title}
      </Text>
      <Text className={`font-pregular text-center text-sm text-gray-100`}>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
