import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { palette } from '../theme/tokens';
import type { RootScreenProps } from '../types/navigation';

export function LoginScreen({ navigation }: RootScreenProps<'Login'>): React.JSX.Element {
  const [email, setEmail] = useState('neema@mamacare.app');
  const [password, setPassword] = useState('MamaCare2026');

  return (
    <ScreenFrame>
      <SectionHeader
        title="Welcome back"
        subtitle="Sign in to open your dashboard, reminders, and care journey."
      />

      <View style={styles.form}>
        <InputField
          label="Email"
          placeholder="name@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Forgot password?</Text>
        </Pressable>
      </View>

      <PrimaryButton title="Open dashboard" onPress={() => navigation.replace('MainTabs')} />
      <PrimaryButton title="Create a new account" onPress={() => navigation.navigate('Register')} variant="soft" />
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  link: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.secondary,
  },
});
