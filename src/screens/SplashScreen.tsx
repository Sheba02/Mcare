import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ScreenFrame } from '../components/ScreenFrame';
import { gradients, palette, radii } from '../theme/tokens';
import type { RootScreenProps } from '../types/navigation';

export function SplashScreen({ navigation }: RootScreenProps<'Splash'>): React.JSX.Element {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenFrame
      scroll={false}
      contentContainerStyle={styles.container}
    >
      <LinearGradient colors={gradients.hero} style={styles.badge}>
        <Text style={styles.badgeText}>M+</Text>
      </LinearGradient>
      <Text style={styles.title}>MamaCare+</Text>
      <Text style={styles.subtitle}>Maternal and child health companion for every stage of care.</Text>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  badge: {
    width: 92,
    height: 92,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 32,
    fontWeight: '800',
    color: palette.white,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: palette.text,
  },
  subtitle: {
    maxWidth: 280,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 24,
    color: palette.textMuted,
  },
});
