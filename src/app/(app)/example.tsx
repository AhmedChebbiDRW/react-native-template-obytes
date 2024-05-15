import React from 'react';

import type { ExampleFormProps } from '@/components/example-form';
import { ExampleForm } from '@/components/example-form';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function Example() {
  useSoftKeyboardEffect();

  const onSubmit: ExampleFormProps['onSubmit'] = (data) => {
    console.log(data);
  };
  return (
    <>
      <FocusAwareStatusBar />
      <ExampleForm onSubmit={onSubmit} />
    </>
  );
}
