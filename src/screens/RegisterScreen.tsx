import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import type { RootScreenProps } from '../types/navigation';

export function RegisterScreen({ navigation }: RootScreenProps<'Register'>): React.JSX.Element {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScreenFrame>
      <SectionHeader
        title="Create your account"
        subtitle="Start with a clean registration flow that feels serious enough for real deployment."
      />

      <View style={styles.form}>
        <InputField
          label="Full name"
          placeholder="Neema John"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
        <InputField
          label="Phone number"
          placeholder="+255 7XX XXX XXX"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <InputField
          label="Estimated due date"
          placeholder="July 18, 2026"
          value={dueDate}
          onChangeText={setDueDate}
          autoCapitalize="words"
        />
        <InputField
          label="Password"
          placeholder="Create a secure password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <PrimaryButton title="Continue to onboarding" onPress={() => navigation.replace('Onboarding')} />
      <PrimaryButton title="Already have an account" onPress={() => navigation.navigate('Login')} variant="outline" />
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
});
