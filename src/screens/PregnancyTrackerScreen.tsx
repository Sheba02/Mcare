import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { InputField } from '../components/InputField';
import { ListRow } from '../components/ListRow';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { useAppLanguage, type AppLanguage } from '../context/AppLanguageContext';
import { getLocalizedContent } from '../data/localizedContent';
import { palette, radii } from '../theme/tokens';

type PregnancyCopy = {
  currentWeekLabel: string;
  currentWeekTitle: string;
  currentWeekBody: string;
  pregnancyData: string;
  careSummary: string;
  formBody: string;
  monthStarted: string;
  monthStartedCaption: string;
  dueDate: string;
  dueDateExample: string;
  firstPregnancy: string;
  previousPregnancies: string;
  previousPregnanciesCaption: string;
  riskLevel: string;
  save: string;
  weeklyFocus: string;
  yes: string;
  no: string;
  normal: string;
  high: string;
  summaryIntro: string;
  historyFirst: string;
  historyPrevious: (count: string) => string;
  saved: (args: { startMonth: string; dueDate: string; week: string; history: string; risk: string }) => string;
};

const pregnancyCopy: Record<AppLanguage, PregnancyCopy> = {
  English: {
    currentWeekLabel: 'Current pregnancy week',
    currentWeekTitle: 'You are {week} weeks pregnant',
    currentWeekBody: 'The week is auto-calculated from the due date so the app can show the right reminders and clinic planning.',
    pregnancyData: 'Pregnancy data',
    careSummary: 'Care summary',
    formBody: 'Capture the pregnancy stage clearly so the app can support appointment planning and reduce missed care.',
    monthStarted: 'Month pregnancy started',
    monthStartedCaption: 'Use the month the mother reports she became pregnant or the closest recorded month.',
    dueDate: 'Due date',
    dueDateExample: 'Example: 2026-07-18',
    firstPregnancy: 'Is this the first pregnancy?',
    previousPregnancies: 'Previous pregnancies',
    previousPregnanciesCaption: 'This helps the hospital understand pregnancy history without using unclear labels.',
    riskLevel: 'Risk level',
    save: 'Save pregnancy data',
    weeklyFocus: 'Weekly focus',
    yes: 'Yes',
    no: 'No',
    normal: 'Normal',
    high: 'High',
    summaryIntro: 'Add pregnancy data here so the care plan can highlight missed visits and show the right stage of care.',
    historyFirst: 'first pregnancy',
    historyPrevious: (count) => `${count} previous pregnanc${count === '1' ? 'y' : 'ies'}`,
    saved: ({ startMonth, dueDate, week, history, risk }) =>
      `Pregnancy recorded from ${startMonth}. Due date saved for ${dueDate}. Current pregnancy week is ${week}. Mother is marked as ${history} with ${risk.toLowerCase()} risk.`,
  },
  Kiswahili: {
    currentWeekLabel: 'Wiki ya sasa ya ujauzito',
    currentWeekTitle: 'Una ujauzito wa wiki {week}',
    currentWeekBody: 'Wiki huhesabiwa moja kwa moja kutoka tarehe ya kujifungua ili app ionyeshe vikumbusho sahihi na mpango wa kliniki.',
    pregnancyData: 'Taarifa za ujauzito',
    careSummary: 'Muhtasari wa huduma',
    formBody: 'Weka hatua ya ujauzito wazi ili app iweze kusaidia kupanga miadi na kupunguza huduma iliyokosekana.',
    monthStarted: 'Mwezi ujauzito ulianza',
    monthStartedCaption: 'Tumia mwezi ambao mama anaripoti alipata ujauzito au mwezi wa karibu uliorekodiwa.',
    dueDate: 'Tarehe ya kujifungua',
    dueDateExample: 'Mfano: 2026-07-18',
    firstPregnancy: 'Huu ni ujauzito wa kwanza?',
    previousPregnancies: 'Ujauzito zilizopita',
    previousPregnanciesCaption: 'Hii husaidia hospitali kuelewa historia ya ujauzito kwa njia iliyo wazi.',
    riskLevel: 'Kiwango cha hatari',
    save: 'Hifadhi taarifa za ujauzito',
    weeklyFocus: 'Mwelekeo wa wiki hii',
    yes: 'Ndiyo',
    no: 'Hapana',
    normal: 'Kawaida',
    high: 'Hatari kubwa',
    summaryIntro: 'Ongeza taarifa za ujauzito hapa ili mpango wa huduma uweze kuonyesha miadi iliyokosekana na hatua sahihi ya huduma.',
    historyFirst: 'ujauzito wa kwanza',
    historyPrevious: (count) => `ujauzito ${count} zilizopita`,
    saved: ({ startMonth, dueDate, week, history, risk }) =>
      `Ujauzito umehifadhiwa kuanzia ${startMonth}. Tarehe ya kujifungua ni ${dueDate}. Wiki ya sasa ya ujauzito ni ${week}. Mama ameandikwa kama ${history} na ${risk.toLowerCase()}.`,
  },
  Kinyarwanda: {
    currentWeekLabel: 'Icyumweru cy’ugutwita uriho',
    currentWeekTitle: 'Ufite inda y’ibyumweru {week}',
    currentWeekBody: 'Icyumweru kiboneka uhereye ku itariki yo kubyara kugira ngo app itange kwibutsa no gutegura kliniki neza.',
    pregnancyData: 'Amakuru y’ugutwita',
    careSummary: 'Incamake y’ubuvuzi',
    formBody: 'Andika neza icyiciro cy’ugutwita kugira ngo app ifashe gutegura gahunda no kugabanya gusiba ubuvuzi.',
    monthStarted: 'Ukwezi gutwita kwatangiriyeho',
    monthStartedCaption: 'Koresha ukwezi mama yibukira ko yatwitiyemo cyangwa ukwezi kwegereye amakuru yanditswe.',
    dueDate: 'Itariki yo kubyara',
    dueDateExample: 'Urugero: 2026-07-18',
    firstPregnancy: 'Ni inda ya mbere?',
    previousPregnancies: 'Inda zabanje',
    previousPregnanciesCaption: 'Ibi bifasha ibitaro gusobanukirwa amateka y’inda mu buryo bworoshye.',
    riskLevel: 'Urwego rw’ibyago',
    save: 'Bika amakuru y’ugutwita',
    weeklyFocus: 'Ibyibandwaho muri iki cyumweru',
    yes: 'Yego',
    no: 'Oya',
    normal: 'Bisanzwe',
    high: 'Byisumbuye',
    summaryIntro: 'Andika amakuru y’ugutwita hano kugira ngo gahunda y’ubuvuzi igaragaze gahunda zabuze n’icyiciro gikwiye cy’ubuvuzi.',
    historyFirst: 'inda ya mbere',
    historyPrevious: (count) => `inda ${count} zabanje`,
    saved: ({ startMonth, dueDate, week, history, risk }) =>
      `Ugutwita kwabitswe guhera ${startMonth}. Itariki yo kubyara ni ${dueDate}. Icyumweru cy’ubu ni ${week}. Mama yashyizwe muri ${history} kandi ari ku rwego rwa ${risk.toLowerCase()}.`,
  },
};

export function PregnancyTrackerScreen(): React.JSX.Element {
  const { language, t } = useAppLanguage();
  const content = getLocalizedContent(language);
  const copy = pregnancyCopy[language];
  const [pregnancyStartMonth, setPregnancyStartMonth] = useState('October 2025');
  const [dueDate, setDueDate] = useState('2026-07-18');
  const [firstPregnancy, setFirstPregnancy] = useState(copy.yes);
  const [previousPregnancies, setPreviousPregnancies] = useState('0');
  const [riskLevel, setRiskLevel] = useState(copy.normal);
  const [savedMessage, setSavedMessage] = useState(copy.summaryIntro);

  const currentWeek = useMemo(() => {
    const parsedDueDate = new Date(dueDate);

    if (Number.isNaN(parsedDueDate.getTime())) {
      return '--';
    }

    const today = new Date();
    const millisecondsUntilDueDate = parsedDueDate.getTime() - today.getTime();
    const weeksUntilDueDate = millisecondsUntilDueDate / (7 * 24 * 60 * 60 * 1000);
    const calculatedWeek = Math.floor(40 - weeksUntilDueDate);

    if (calculatedWeek < 1) {
      return '1';
    }

    if (calculatedWeek > 40) {
      return '40+';
    }

    return String(calculatedWeek);
  }, [dueDate]);

  const savePregnancyData = (): void => {
    const historyLabel =
      firstPregnancy === copy.yes
        ? copy.historyFirst
        : copy.historyPrevious(previousPregnancies || '0');

    setSavedMessage(
      copy.saved({
        startMonth: pregnancyStartMonth,
        dueDate,
        week: currentWeek,
        history: historyLabel,
        risk: riskLevel,
      })
    );
  };

  return (
    <ScreenFrame>
      <SectionHeader title={t('pregnancyTracker')} subtitle={t('pregnancySubtitle')} />

      <View style={styles.weekCard}>
        <Text style={styles.weekLabel}>{copy.currentWeekLabel}</Text>
        <Text style={styles.weekTitle}>{copy.currentWeekTitle.replace('{week}', currentWeek)}</Text>
        <Text style={styles.weekBody}>{copy.currentWeekBody}</Text>
      </View>

      <View style={styles.summaryBlock}>
        <Text style={styles.summaryEyebrow}>{copy.pregnancyData}</Text>
        <Text style={styles.summaryTitle}>{copy.careSummary}</Text>
        <Text style={styles.summaryBody}>{savedMessage}</Text>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.formTitle}>{copy.pregnancyData}</Text>
        <Text style={styles.formBody}>{copy.formBody}</Text>

        <InputField
          label={copy.monthStarted}
          placeholder="October 2025"
          value={pregnancyStartMonth}
          onChangeText={setPregnancyStartMonth}
          autoCapitalize="words"
          caption={copy.monthStartedCaption}
        />

        <InputField
          label={copy.dueDate}
          placeholder="YYYY-MM-DD"
          value={dueDate}
          onChangeText={setDueDate}
          caption={copy.dueDateExample}
        />

        <View style={styles.sectionGroup}>
          <Text style={styles.groupLabel}>{copy.firstPregnancy}</Text>
          <ChipGroup
            options={[copy.yes, copy.no]}
            selected={firstPregnancy}
            onSelect={setFirstPregnancy}
          />
        </View>

        {firstPregnancy === copy.no ? (
          <InputField
            label={copy.previousPregnancies}
            placeholder="2"
            value={previousPregnancies}
            onChangeText={setPreviousPregnancies}
            keyboardType="number-pad"
            caption={copy.previousPregnanciesCaption}
          />
        ) : null}

        <View style={styles.sectionGroup}>
          <Text style={styles.groupLabel}>{copy.riskLevel}</Text>
          <ChipGroup
            options={[copy.normal, copy.high]}
            selected={riskLevel}
            onSelect={setRiskLevel}
          />
        </View>

        <PrimaryButton title={copy.save} onPress={savePregnancyData} />
      </View>

      <View style={styles.checklistSection}>
        <Text style={styles.summaryEyebrow}>{copy.weeklyFocus}</Text>
        {content.pregnancyChecklist.map((item) => (
          <ListRow key={item.title} title={item.title} subtitle={item.body} />
        ))}
      </View>
    </ScreenFrame>
  );
}

type ChipGroupProps = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

function ChipGroup({ options, selected, onSelect }: ChipGroupProps): React.JSX.Element {
  return (
    <View style={styles.chipRow}>
      {options.map((option) => {
        const active = option === selected;

        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  weekCard: {
    gap: 8,
    paddingBottom: 6,
  },
  weekLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: palette.primaryDeep,
  },
  weekTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: palette.text,
  },
  weekBody: {
    fontSize: 15,
    lineHeight: 24,
    color: palette.textMuted,
  },
  summaryBlock: {
    gap: 8,
    paddingBottom: 4,
  },
  summaryEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: palette.primaryDeep,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: palette.text,
  },
  summaryBody: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  formSection: {
    gap: 16,
    paddingTop: 4,
    paddingBottom: 8,
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
  sectionGroup: {
    gap: 10,
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.text,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderRadius: radii.pill,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
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
  checklistSection: {
    backgroundColor: palette.white,
    borderRadius: radii.lg,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: palette.border,
  },
});
