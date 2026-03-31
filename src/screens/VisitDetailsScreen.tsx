import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ListRow } from '../components/ListRow';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { useAppLanguage, type AppLanguage } from '../context/AppLanguageContext';
import { getLocalizedContent } from '../data/localizedContent';
import { palette } from '../theme/tokens';
import type { RootScreenProps } from '../types/navigation';

export function VisitDetailsScreen({
  navigation,
  route,
}: RootScreenProps<'VisitDetails'>): React.JSX.Element {
  const { language, t } = useAppLanguage();
  const content = getLocalizedContent(language);
  const labels = visitLabels[language];
  const visit = content.appointments.find((item) => item.id === route.params.visitId) ?? content.appointments[0];

  return (
    <ScreenFrame>
      <SectionHeader title={t('visitDetails')} subtitle={t('visitDetailsSubtitle')} />
      <View style={styles.summary}>
        <Text style={styles.status}>{visit.status}</Text>
        <Text style={styles.title}>{visit.title}</Text>
        <Text style={styles.copy}>{visit.summary}</Text>
      </View>
      <View style={styles.detailList}>
        <ListRow title={labels.visitTime} subtitle={visit.time} compact />
        <ListRow title={labels.location} subtitle={visit.location} compact />
        <ListRow
          title={labels.suggestedAction}
          subtitle={labels.actionBody}
          compact
        />
      </View>
      <PrimaryButton title={t('backToAppointments')} onPress={() => navigation.goBack()} />
    </ScreenFrame>
  );
}

const visitLabels: Record<
  AppLanguage,
  { visitTime: string; location: string; suggestedAction: string; actionBody: string }
> = {
  English: {
    visitTime: 'Visit time',
    location: 'Location',
    suggestedAction: 'Suggested action',
    actionBody: 'Confirm transport, prepare the clinic book, and keep emergency contacts ready if symptoms change.',
  },
  Kiswahili: {
    visitTime: 'Muda wa ziara',
    location: 'Mahali',
    suggestedAction: 'Hatua inayopendekezwa',
    actionBody: 'Hakiki usafiri, andaa kitabu cha kliniki, na weka mawasiliano ya dharura tayari ikiwa dalili zitabadilika.',
  },
  Kinyarwanda: {
    visitTime: 'Igihe cya gahunda',
    location: 'Aho izabera',
    suggestedAction: 'Igikorwa gisabwa',
    actionBody: 'Emeza ingendo, tegura igitabo cya kliniki, kandi utegure nimero z’ubutabazi niba ibimenyetso bihindutse.',
  },
};

const styles = StyleSheet.create({
  summary: {
    gap: 8,
    paddingBottom: 6,
  },
  status: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: palette.primaryDeep,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: palette.text,
  },
  copy: {
    fontSize: 15,
    lineHeight: 24,
    color: palette.textMuted,
  },
  detailList: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 24,
    paddingHorizontal: 18,
  },
});
