import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { InfoCard } from '../components/InfoCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { welcomeHighlights } from '../data/appContent';
import { gradients, palette, radii } from '../theme/tokens';
import type { RootScreenProps } from '../types/navigation';

export function WelcomeScreen({ navigation }: RootScreenProps<'Welcome'>): React.JSX.Element {
  return (
    <ScreenFrame>
      <LinearGradient colors={gradients.hero} style={styles.hero}>
        <Text style={styles.eyebrow}>Sponsor-ready maternal care platform</Text>
        <Text style={styles.heroTitle}>Professional mobile care companion for mothers, babies, and clinics.</Text>
        <Text style={styles.heroBody}>
          Build trust with a real product flow: onboarding, reminders, health tracking, education, and follow-up.
        </Text>
      </LinearGradient>

      <View style={styles.stack}>
        {welcomeHighlights.map((item, index) => (
          <InfoCard
            key={item.title}
            title={item.title}
            body={item.body}
            tone={index === 1 ? 'teal' : index === 2 ? 'accent' : 'neutral'}
          />
        ))}
      </View>

      <View style={styles.buttonGroup}>
        <PrimaryButton title="Sign in" onPress={() => navigation.navigate('Login')} />
        <PrimaryButton title="Create account" onPress={() => navigation.navigate('Register')} variant="outline" />
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radii.xl,
    padding: 22,
    gap: 10,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#D6EEE7',
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
    color: '#E5F0ED',
  },
  stack: {
    gap: 14,
  },
  buttonGroup: {
    gap: 12,
    marginTop: 4,
    marginBottom: 8,
  },
});
