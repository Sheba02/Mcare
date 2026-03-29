import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { appointments } from '../data/appContent';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { palette, radii } from '../theme/tokens';

type AppointmentsScreenProps = {
  onOpenVisitDetails: (visitId: string) => void;
};

export function AppointmentsScreen({
  onOpenVisitDetails,
}: AppointmentsScreenProps): React.JSX.Element {
  return (
    <ScreenFrame>
      <SectionHeader
        title="Appointments"
        subtitle="The schedule view is ready for ANC, PNC, vaccines, and missed-visit follow-up."
      />

      {appointments.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.badge}>{item.status}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>{item.time}</Text>
          <Text style={styles.meta}>{item.location}</Text>
          <Text style={styles.body}>{item.summary}</Text>
          <PrimaryButton title="Open details" onPress={() => onOpenVisitDetails(item.id)} variant="soft" />
        </View>
      ))}
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    padding: 18,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: palette.secondarySoft,
    color: palette.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: palette.text,
  },
  meta: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.primaryDeep,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
    marginBottom: 4,
  },
});
