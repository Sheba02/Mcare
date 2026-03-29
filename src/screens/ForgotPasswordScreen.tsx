import React, { useState } from 'react';

import { InfoCard } from '../components/InfoCard';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import type { RootScreenProps } from '../types/navigation';

export function ForgotPasswordScreen({
  navigation,
}: RootScreenProps<'ForgotPassword'>): React.JSX.Element {
  const [email, setEmail] = useState('');

  return (
    <ScreenFrame>
      <SectionHeader
        title="Recover access"
        subtitle="This placeholder recovery flow gives the auth stack the structure a production app needs."
      />
      <InputField
        label="Email"
        placeholder="name@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <InfoCard
        title="Recovery note"
        body="In the real app, this button would send a recovery link or one-time code through SMS or email."
        tone="teal"
      />
      <PrimaryButton title="Send recovery instructions" onPress={() => navigation.goBack()} />
    </ScreenFrame>
  );
}
