import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { appointments } from '../data/appContent';
import { InputField } from '../components/InputField';
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
  const [ancVisitDate, setAncVisitDate] = useState('');
  const [pncVisitDate, setPncVisitDate] = useState('');
  const [nextAppointmentDate, setNextAppointmentDate] = useState('2026-03-30');
  const [notes, setNotes] = useState('');
  const [ancVisits, setAncVisits] = useState<string[]>(['2026-02-10', '2026-03-12']);
  const [pncVisits, setPncVisits] = useState<string[]>([]);

  const reminderSummary = useMemo(() => {
    const ancSummary = ancVisits.length > 0 ? ancVisits.join(', ') : 'No ANC visits recorded yet';
    const pncSummary = pncVisits.length > 0 ? pncVisits.join(', ') : 'No PNC visits recorded yet';
    const noteSummary = notes.trim().length > 0 ? notes : 'No visit notes added yet';

    return `ANC visits: ${ancSummary}\nPNC visits: ${pncSummary}\nNext appointment: ${nextAppointmentDate || 'Not set'}\nNotes: ${noteSummary}`;
  }, [ancVisits, notes, nextAppointmentDate, pncVisits]);

  const addAncVisit = (): void => {
    if (!ancVisitDate.trim()) {
      return;
    }

    setAncVisits((current) => [...current, ancVisitDate.trim()]);
    setAncVisitDate('');
  };

  const addPncVisit = (): void => {
    if (!pncVisitDate.trim()) {
      return;
    }

    setPncVisits((current) => [...current, pncVisitDate.trim()]);
    setPncVisitDate('');
  };

  return (
    <ScreenFrame>
      <SectionHeader
        title="Appointments"
        subtitle="The schedule view is ready for ANC, PNC, vaccines, and missed-visit follow-up."
      />

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Medical visit data</Text>
        <Text style={styles.formBody}>
          Keep visit records visible so missed appointments are easier to notice and follow up quickly.
        </Text>

        <InputField
          label="ANC visit date"
          placeholder="YYYY-MM-DD"
          value={ancVisitDate}
          onChangeText={setAncVisitDate}
          caption="Add each antenatal care visit one by one."
        />
        <PrimaryButton title="Add ANC visit" onPress={addAncVisit} variant="soft" />

        <InputField
          label="PNC visit date"
          placeholder="YYYY-MM-DD"
          value={pncVisitDate}
          onChangeText={setPncVisitDate}
          caption="Add each postnatal care visit one by one."
        />
        <PrimaryButton title="Add PNC visit" onPress={addPncVisit} variant="soft" />

        <InputField
          label="Next appointment date"
          placeholder="YYYY-MM-DD"
          value={nextAppointmentDate}
          onChangeText={setNextAppointmentDate}
          caption="This date should drive reminders and missed-visit detection."
        />

        <InputField
          label="Notes"
          placeholder="Optional follow-up note"
          value={notes}
          onChangeText={setNotes}
          autoCapitalize="sentences"
          caption="Use this for transport issues, rescheduling, or provider instructions."
        />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Missed-visit support summary</Text>
        <Text style={styles.summaryBody}>{reminderSummary}</Text>
      </View>

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
  formCard: {
    borderRadius: radii.xl,
    padding: 20,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 14,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: palette.text,
  },
  formBody: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  summaryCard: {
    borderRadius: radii.lg,
    padding: 18,
    backgroundColor: palette.secondarySoft,
    borderWidth: 1,
    borderColor: '#B6D7CF',
    gap: 8,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: palette.text,
  },
  summaryBody: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
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
