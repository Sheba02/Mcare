import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppLanguage } from '../context/AppLanguageContext';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { gradients, palette, radii } from '../theme/tokens';
import type { RootScreenProps } from '../types/navigation';

export function LoginScreen({ navigation }: RootScreenProps<'Login'>): React.JSX.Element {
  const { t } = useAppLanguage();
  const [email, setEmail] = useState('neema@mamacare.app');
  const [password, setPassword] = useState('MamaCare2026');

  return (
    <ScreenFrame scroll={false} contentContainerStyle={styles.container}>
      <View style={styles.panel}>
        <LinearGradient colors={gradients.hero} style={styles.hero}>
          <Text style={styles.eyebrow}>{t('appName')}</Text>
          <Text style={styles.heroTitle}>{t('welcomeBack')}</Text>
          <Text style={styles.heroBody}>Sign in to open your dashboard, reminders, and care journey.</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.authHeader}>
            <Text style={styles.authTitle}>{t('signIn')}</Text>
            <Text style={styles.authSubtitle}>{t('loginBody')}</Text>
          </View>

          <View style={styles.form}>
            <InputField
              label={t('email')}
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <InputField
              label={t('password')}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.link}>{t('forgotPassword')}</Text>
            </Pressable>
          </View>

          <View style={styles.buttonGroup}>
            <PrimaryButton title={t('signIn')} onPress={() => navigation.replace('MainTabs')} />
            <PrimaryButton
              title={t('createAccount')}
              onPress={() => navigation.navigate('Register')}
              variant="outline"
            />
          </View>
        </View>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  panel: {
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
  },
  hero: {
    padding: 22,
    gap: 8,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#FFE4EA',
  },
  heroTitle: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: palette.white,
  },
  heroBody: {
    fontSize: 15,
    lineHeight: 24,
    color: '#FFE9EE',
  },
  content: {
    padding: 22,
    gap: 18,
  },
  authHeader: {
    gap: 6,
  },
  authTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: palette.text,
  },
  authSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  form: {
    gap: 16,
  },
  link: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.secondary,
  },
  buttonGroup: {
    gap: 12,
  },
});
