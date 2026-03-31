import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppLanguage } from '../context/AppLanguageContext';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { gradients, palette, radii } from '../theme/tokens';
import type { RootScreenProps } from '../types/navigation';

export function ForgotPasswordScreen({
  navigation,
}: RootScreenProps<'ForgotPassword'>): React.JSX.Element {
  const { t } = useAppLanguage();
  const [email, setEmail] = useState('');

  return (
    <ScreenFrame scroll={false} contentContainerStyle={styles.container}>
      <View style={styles.panel}>
        <LinearGradient colors={gradients.hero} style={styles.hero}>
          <Text style={styles.eyebrow}>{t('appName')}</Text>
          <Text style={styles.heroTitle}>{t('recoverAccess')}</Text>
          <Text style={styles.heroBody}>We will send recovery instructions to the account you enter below.</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.authHeader}>
            <Text style={styles.authTitle}>{t('forgotPassword')}</Text>
            <Text style={styles.authSubtitle}>{t('recoverBody')}</Text>
          </View>

          <InputField
            label={t('email')}
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={styles.noteBlock}>
            <Text style={styles.noteTitle}>Recovery note</Text>
            <Text style={styles.noteBody}>
              In the real app, this action would send a recovery link or one-time code through SMS or email.
            </Text>
          </View>

          <View style={styles.buttonGroup}>
            <PrimaryButton title={t('sendRecovery')} onPress={() => navigation.goBack()} />
            <PrimaryButton title={t('backToSignIn')} onPress={() => navigation.goBack()} variant="outline" />
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
  noteBlock: {
    gap: 6,
    paddingTop: 4,
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.text,
  },
  noteBody: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  buttonGroup: {
    gap: 12,
  },
});
