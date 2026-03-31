import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppLanguage, type AppLanguage } from '../context/AppLanguageContext';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { gradients, palette, radii } from '../theme/tokens';
import type { RootScreenProps } from '../types/navigation';

const languageOptions: AppLanguage[] = ['Kinyarwanda', 'English', 'Kiswahili'];

export function RegisterScreen({ navigation }: RootScreenProps<'Register'>): React.JSX.Element {
  const { language, setLanguage, t } = useAppLanguage();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ScreenFrame scroll={false} contentContainerStyle={styles.container}>
      <View style={styles.panel}>
        <LinearGradient colors={gradients.hero} style={styles.hero}>
          <Text style={styles.eyebrow}>{t('appName')}</Text>
          <Text style={styles.heroTitle}>{t('createAccount')}</Text>
          <Text style={styles.heroBody}>Join the MamaCare+ network and start your care journey.</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.authHeader}>
            <Text style={styles.authTitle}>{t('register')}</Text>
            <Text style={styles.authSubtitle}>{t('registerBody')}</Text>
          </View>

          <View style={styles.form}>
            <InputField
              label={t('fullName')}
              placeholder="Neema John"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
            <InputField
              label={t('phoneNumber')}
              placeholder="+255 7XX XXX XXX"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <InputField
              label={t('email')}
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <InputField
              label={t('password')}
              placeholder="Create a secure password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <InputField
              label={t('confirmPassword')}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <View style={styles.languageSection}>
              <Text style={styles.languageLabel}>{t('preferredLanguage')}</Text>
              <Text style={styles.languageBody}>{t('preferredLanguageBody')}</Text>
              <View style={styles.languageRow}>
                {languageOptions.map((option) => {
                  const active = option === language;

                  return (
                    <Pressable
                      key={option}
                      onPress={() => setLanguage(option)}
                      style={[styles.languageChip, active && styles.languageChipActive]}
                    >
                      <Text style={[styles.languageChipText, active && styles.languageChipTextActive]}>
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>

          <View style={styles.buttonGroup}>
            <PrimaryButton title={t('createAccount')} onPress={() => navigation.replace('Onboarding')} />
            <PrimaryButton
              title={t('alreadyHaveAccount')}
              onPress={() => navigation.navigate('Login')}
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
  languageSection: {
    gap: 8,
  },
  languageLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.text,
  },
  languageBody: {
    fontSize: 13,
    lineHeight: 20,
    color: palette.textMuted,
  },
  languageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  languageChip: {
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
  },
  languageChipActive: {
    backgroundColor: palette.secondary,
    borderColor: palette.secondary,
  },
  languageChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.text,
  },
  languageChipTextActive: {
    color: palette.white,
  },
  buttonGroup: {
    gap: 12,
  },
});
