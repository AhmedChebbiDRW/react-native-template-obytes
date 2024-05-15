/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import type { Option } from '@/ui';
import {
  Button,
  Checkbox,
  ControlledInput,
  ControlledSelect,
  Radio,
  Switch,
  Text,
  View,
} from '@/ui';

const options: Option[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
  select: z.string({ required_error: 'Must select a choice' }),
  checked: z.boolean(),
  radio: z.boolean(),
  switcher: z.boolean(),
});

export type FormType = z.infer<typeof schema>;

export type ExampleFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const ExampleForm = ({ onSubmit = () => {} }: ExampleFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="flex-1 justify-center p-4">
      <Text testID="form-title" className="pb-6 text-center text-2xl">
        Controlled Form
      </Text>

      <ControlledInput
        testID="name"
        control={control}
        name="name"
        label="Name"
      />

      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="***"
        secureTextEntry={true}
      />
      <ControlledSelect
        control={control}
        name="select"
        disabled={isSubmitting}
        label="Select"
        options={options}
      />
      <Controller
        name="checked"
        control={control}
        rules={{ required: false }}
        render={({ field }) => (
          <Checkbox.Root
            accessibilityLabel="accept terms of condition"
            className="pb-2"
            checked={field.value}
            onChange={field.onChange}
          >
            <Checkbox.Icon checked={field.value} />
            <Checkbox.Label text="checkbox" />
          </Checkbox.Root>
        )}
      />
      <Controller
        name="radio"
        control={control}
        rules={{ required: false }}
        render={({ field }) => (
          <Radio.Root
            checked={field.value}
            onChange={field.onChange}
            accessibilityLabel="radio button"
            className="pb-2"
          >
            <Radio.Icon checked={field.value} />
            <Radio.Label text="radio button" />
          </Radio.Root>
        )}
      />
      <Controller
        name="switcher"
        control={control}
        rules={{ required: false }}
        render={({ field }) => (
          <Switch.Root
            checked={field.value}
            onChange={field.onChange}
            accessibilityLabel="switch"
            className="pb-2"
          >
            <Switch.Icon checked={field.value} />
            <Switch.Label text="switch" />
          </Switch.Root>
        )}
      />

      <Button
        testID="login-button"
        label="Login"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
