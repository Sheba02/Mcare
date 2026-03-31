import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { useAppLanguage, type AppLanguage } from '../context/AppLanguageContext';
import { getLocalizedContent } from '../data/localizedContent';
import { palette, radii } from '../theme/tokens';
import type { RootScreenProps } from '../types/navigation';

const languages: AppLanguage[] = ['Kinyarwanda', 'English', 'Kiswahili'];

export function OnboardingScreen({ navigation }: RootScreenProps<'Onboarding'>): React.JSX.Element {
  const { language, setLanguage, t } = useAppLanguage();
  const content = getLocalizedContent(language);
  const [nickname, setNickname] = useState('Little Star');
  const [clinic, setClinic] = useState('Kijiji Health Centre');
  const [profile, setProfile] = useState(content.onboardingProfiles[0]);

  useEffect(() => {
    if (!content.onboardingProfiles.includes(profile)) {
      setProfile(content.onboardingProfiles[0]);
    }
  }, [content.onboardingProfiles, profile]);

  return (
    <ScreenFrame>
      <SectionHeader
        title={t('onboardingTitle')}
        subtitle={t('onboardingSubtitle')}
      />

      <View style={styles.form}>
        <InputField
          label={t('babyNickname')}
          placeholder="Little Star"
          value={nickname}
          onChangeText={setNickname}
          autoCapitalize="words"
        />
        <InputField
          label={t('preferredClinic')}
          placeholder={language === 'English' ? 'Facility name' : language === 'Kiswahili' ? 'Jina la kituo' : 'Izina ry’ivuriro'}
          value={clinic}
          onChangeText={setClinic}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.selectorGroup}>
        <Text style={styles.selectorLabel}>{t('profileType')}</Text>
        <View style={styles.row}>
          {content.onboardingProfiles.map((item) => (
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
        <Text style={styles.selectorLabel}>{t('preferredLanguage')}</Text>
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

      <PrimaryButton title={t('finishSetup')} onPress={() => navigation.replace('MainTabs')} />
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
