import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { useAppLanguage, type AppLanguage } from '../context/AppLanguageContext';
import { getLocalizedContent } from '../data/localizedContent';
import { palette, radii } from '../theme/tokens';

type AppointmentsScreenProps = {
  onOpenVisitDetails: (visitId: string) => void;
};

type AppointmentCopy = {
  ancVisitDate: string;
  ancCaption: string;
  addAncVisit: string;
  pncVisitDate: string;
  pncCaption: string;
  addPncVisit: string;
  nextAppointmentDate: string;
  nextAppointmentCaption: string;
  notes: string;
  notesPlaceholder: string;
  notesCaption: string;
  noAncVisits: string;
  noPncVisits: string;
  noNotes: string;
  notSet: string;
  summary: (args: { anc: string; pnc: string; next: string; notes: string }) => string;
  openDetails: string;
};

const appointmentCopy: Record<AppLanguage, AppointmentCopy> = {
  English: {
    ancVisitDate: 'ANC visit date',
    ancCaption: 'Add each antenatal care visit one by one.',
    addAncVisit: 'Add ANC visit',
    pncVisitDate: 'PNC visit date',
    pncCaption: 'Add each postnatal care visit one by one.',
    addPncVisit: 'Add PNC visit',
    nextAppointmentDate: 'Next appointment date',
    nextAppointmentCaption: 'This date should drive reminders and missed-visit detection.',
    notes: 'Notes',
    notesPlaceholder: 'Optional follow-up note',
    notesCaption: 'Use this for transport issues, rescheduling, or provider instructions.',
    noAncVisits: 'No ANC visits recorded yet',
    noPncVisits: 'No PNC visits recorded yet',
    noNotes: 'No visit notes added yet',
    notSet: 'Not set',
    summary: ({ anc, pnc, next, notes }) => `ANC visits: ${anc}\nPNC visits: ${pnc}\nNext appointment: ${next}\nNotes: ${notes}`,
    openDetails: 'Open details',
  },
  Kiswahili: {
    ancVisitDate: 'Tarehe ya ziara ya ANC',
    ancCaption: 'Ongeza kila ziara ya kliniki ya ujauzito moja baada ya nyingine.',
    addAncVisit: 'Ongeza ziara ya ANC',
    pncVisitDate: 'Tarehe ya ziara ya PNC',
    pncCaption: 'Ongeza kila ziara ya baada ya kujifungua moja baada ya nyingine.',
    addPncVisit: 'Ongeza ziara ya PNC',
    nextAppointmentDate: 'Tarehe ya miadi ijayo',
    nextAppointmentCaption: 'Tarehe hii inapaswa kuendesha vikumbusho na ufuatiliaji wa miadi iliyokosekana.',
    notes: 'Maelezo',
    notesPlaceholder: 'Maelezo ya hiari ya ufuatiliaji',
    notesCaption: 'Tumia hapa kwa changamoto za usafiri, kubadilisha tarehe, au maelekezo ya mtoa huduma.',
    noAncVisits: 'Bado hakuna ziara za ANC zilizorekodiwa',
    noPncVisits: 'Bado hakuna ziara za PNC zilizorekodiwa',
    noNotes: 'Bado hakuna maelezo ya ziara',
    notSet: 'Haijawekwa',
    summary: ({ anc, pnc, next, notes }) => `Ziara za ANC: ${anc}\nZiara za PNC: ${pnc}\nMiadi ijayo: ${next}\nMaelezo: ${notes}`,
    openDetails: 'Fungua maelezo',
  },
  Kinyarwanda: {
    ancVisitDate: 'Itariki ya gahunda ya ANC',
    ancCaption: 'Andika buri gahunda yo kwipimisha igihe utwite imwe imwe.',
    addAncVisit: 'Ongeraho gahunda ya ANC',
    pncVisitDate: 'Itariki ya gahunda ya PNC',
    pncCaption: 'Andika buri gahunda yo gukurikirana nyuma yo kubyara imwe imwe.',
    addPncVisit: 'Ongeraho gahunda ya PNC',
    nextAppointmentDate: 'Itariki ya gahunda itaha',
    nextAppointmentCaption: 'Iyi tariki ni yo ikwiye gukoreshwa mu kwibutsa no kumenya gahunda zabuze.',
    notes: 'Ibisobanuro',
    notesPlaceholder: 'Icyitonderwa cy’inyongera',
    notesCaption: 'Andika ibibazo by’ingendo, kwimura gahunda, cyangwa amabwiriza ya muganga.',
    noAncVisits: 'Nta gahunda za ANC zirandikwa',
    noPncVisits: 'Nta gahunda za PNC zirandikwa',
    noNotes: 'Nta bisobanuro bya gahunda birandikwa',
    notSet: 'Ntabwo byashyizweho',
    summary: ({ anc, pnc, next, notes }) => `Gahunda za ANC: ${anc}\nGahunda za PNC: ${pnc}\nGahunda itaha: ${next}\nIbisobanuro: ${notes}`,
    openDetails: 'Fungura ibisobanuro',
  },
};

export function AppointmentsScreen({
  onOpenVisitDetails,
}: AppointmentsScreenProps): React.JSX.Element {
  const { language, t } = useAppLanguage();
  const content = getLocalizedContent(language);
  const copy = appointmentCopy[language];
  const [ancVisitDate, setAncVisitDate] = useState('');
  const [pncVisitDate, setPncVisitDate] = useState('');
  const [nextAppointmentDate, setNextAppointmentDate] = useState('2026-03-30');
  const [notes, setNotes] = useState('');
  const [ancVisits, setAncVisits] = useState<string[]>(['2026-02-10', '2026-03-12']);
  const [pncVisits, setPncVisits] = useState<string[]>([]);

  const reminderSummary = useMemo(() => {
    const ancSummary = ancVisits.length > 0 ? ancVisits.join(', ') : copy.noAncVisits;
    const pncSummary = pncVisits.length > 0 ? pncVisits.join(', ') : copy.noPncVisits;
    const noteSummary = notes.trim().length > 0 ? notes : copy.noNotes;

    return copy.summary({
      anc: ancSummary,
      pnc: pncSummary,
      next: nextAppointmentDate || copy.notSet,
      notes: noteSummary,
    });
  }, [ancVisits, copy, nextAppointmentDate, notes, pncVisits]);

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
      <SectionHeader title={t('appointmentsTitle')} subtitle={t('appointmentsSubtitle')} />

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>{t('medicalVisitData')}</Text>
        <Text style={styles.formBody}>{t('medicalVisitBody')}</Text>

        <InputField
          label={copy.ancVisitDate}
          placeholder="YYYY-MM-DD"
          value={ancVisitDate}
          onChangeText={setAncVisitDate}
          caption={copy.ancCaption}
        />
        <PrimaryButton title={copy.addAncVisit} onPress={addAncVisit} variant="soft" />

        <InputField
          label={copy.pncVisitDate}
          placeholder="YYYY-MM-DD"
          value={pncVisitDate}
          onChangeText={setPncVisitDate}
          caption={copy.pncCaption}
        />
        <PrimaryButton title={copy.addPncVisit} onPress={addPncVisit} variant="soft" />

        <InputField
          label={copy.nextAppointmentDate}
          placeholder="YYYY-MM-DD"
          value={nextAppointmentDate}
          onChangeText={setNextAppointmentDate}
          caption={copy.nextAppointmentCaption}
        />

        <InputField
          label={copy.notes}
          placeholder={copy.notesPlaceholder}
          value={notes}
          onChangeText={setNotes}
          autoCapitalize="sentences"
          caption={copy.notesCaption}
        />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>{t('missedVisitSummary')}</Text>
        <Text style={styles.summaryBody}>{reminderSummary}</Text>
      </View>

      {content.appointments.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.badge}>{item.status}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>{item.time}</Text>
          <Text style={styles.meta}>{item.location}</Text>
          <Text style={styles.body}>{item.summary}</Text>
          <PrimaryButton title={copy.openDetails} onPress={() => onOpenVisitDetails(item.id)} variant="soft" />
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
    borderColor: palette.border,
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
