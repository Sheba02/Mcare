import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppLanguage } from '../context/AppLanguageContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { gradients, palette, radii } from '../theme/tokens';
import type { RootScreenProps } from '../types/navigation';

export function WelcomeScreen({ navigation }: RootScreenProps<'Welcome'>): React.JSX.Element {
  const { t } = useAppLanguage();

  return (
    <ScreenFrame scroll={false} contentContainerStyle={styles.container}>
      <View style={styles.panel}>
        <LinearGradient colors={gradients.hero} style={styles.hero}>
          <Text style={styles.eyebrow}>Sponsor-ready maternal care platform</Text>
          <Text style={styles.heroTitle}>Professional mobile care companion for mothers, babies, and clinics.</Text>
          <Text style={styles.heroBody}>
            Build trust with a real product flow: onboarding, reminders, health tracking, education, and follow-up.
          </Text>
        </LinearGradient>

        <View style={styles.authSection}>
          <Text style={styles.welcomeLabel}>{t('welcome')}</Text>
          <Text style={styles.welcomeBody}>{t('welcomeBody')}</Text>

          <View style={styles.buttonGroup}>
            <PrimaryButton title={t('signIn')} onPress={() => navigation.navigate('Login')} />
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
    gap: 10,
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
  authSection: {
    gap: 10,
    padding: 22,
  },
  welcomeLabel: {
    fontSize: 26,
    fontWeight: '800',
    color: palette.text,
  },
  welcomeBody: {
    fontSize: 15,
    lineHeight: 24,
    color: palette.textMuted,
  },
  buttonGroup: {
    gap: 12,
    marginTop: 12,
  },
});
