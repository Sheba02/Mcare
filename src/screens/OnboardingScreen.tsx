import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { palette, radii } from '../theme/tokens';
import type { RootScreenProps } from '../types/navigation';

const languages = ['Swahili', 'English', 'Both'];
const profiles = ['Pregnant mother', 'New mother', 'Caregiver'];

export function OnboardingScreen({ navigation }: RootScreenProps<'Onboarding'>): React.JSX.Element {
  const [nickname, setNickname] = useState('Little Star');
  const [clinic, setClinic] = useState('Kijiji Health Centre');
  const [language, setLanguage] = useState('Both');
  const [profile, setProfile] = useState('Pregnant mother');

  return (
    <ScreenFrame>
      <SectionHeader
        title="Set up care preferences"
        subtitle="A strong onboarding flow helps the product feel tailored from the first minute."
      />

      <View style={styles.form}>
        <InputField
          label="Baby nickname"
          placeholder="Little Star"
          value={nickname}
          onChangeText={setNickname}
          autoCapitalize="words"
        />
        <InputField
          label="Preferred clinic"
          placeholder="Facility name"
          value={clinic}
          onChangeText={setClinic}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.selectorGroup}>
        <Text style={styles.selectorLabel}>Profile type</Text>
        <View style={styles.row}>
          {profiles.map((item) => (
            <Pressable
              key={item}
              onPress={() => setProfile(item)}
              style={[styles.chip, profile === item && styles.chipActive]}
            >
              <Text style={[styles.chipText, profile === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.selectorGroup}>
        <Text style={styles.selectorLabel}>Preferred language</Text>
        <View style={styles.row}>
          {languages.map((item) => (
            <Pressable
              key={item}
              onPress={() => setLanguage(item)}
              style={[styles.chip, language === item && styles.chipActive]}
            >
              <Text style={[styles.chipText, language === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <PrimaryButton title="Finish setup" onPress={() => navigation.replace('MainTabs')} />
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  selectorGroup: {
    gap: 10,
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.text,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: palette.secondary,
    borderColor: palette.secondary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.text,
  },
  chipTextActive: {
    color: palette.white,
  },
});
