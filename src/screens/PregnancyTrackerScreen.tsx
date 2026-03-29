import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { InfoCard } from '../components/InfoCard';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { pregnancyChecklist } from '../data/appContent';
import { palette, radii } from '../theme/tokens';

export function PregnancyTrackerScreen(): React.JSX.Element {
  const [dueDate, setDueDate] = useState('2026-07-18');
  const [pregnancyCount, setPregnancyCount] = useState('1');
  const [riskLevel, setRiskLevel] = useState('Normal');
  const [savedMessage, setSavedMessage] = useState(
    'Add pregnancy data here so the care plan can highlight missed visits and show the right stage of care.'
  );

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
    const pregnancyLabel = pregnancyCount === '1' ? 'first pregnancy' : `pregnancy number ${pregnancyCount}`;
    setSavedMessage(
      `Due date saved for ${dueDate}. Current pregnancy week is ${currentWeek}. Marked as ${pregnancyLabel} with ${riskLevel.toLowerCase()} risk.`
    );
  };

  return (
    <ScreenFrame>
      <SectionHeader
        title="Pregnancy tracker"
        subtitle="A structured weekly view for progress, symptoms, and preparation."
      />

      <View style={styles.weekCard}>
        <Text style={styles.weekLabel}>Current pregnancy week</Text>
        <Text style={styles.weekTitle}>Week {currentWeek}</Text>
        <Text style={styles.weekBody}>
          The week is auto-calculated from the due date so the app can show the right reminders and clinic planning.
        </Text>
      </View>

      <InfoCard eyebrow="Pregnancy data" title="Care summary" body={savedMessage} tone="teal" />

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Pregnancy data</Text>
        <Text style={styles.formBody}>
          Capture the pregnancy stage clearly so the app can support appointment planning and reduce missed care.
        </Text>

        <InputField
          label="Due date"
          placeholder="YYYY-MM-DD"
          value={dueDate}
          onChangeText={setDueDate}
          caption="Example: 2026-07-18"
        />

        <View style={styles.sectionGroup}>
          <Text style={styles.groupLabel}>Number of pregnancies</Text>
          <ChipGroup
            options={['1', '2', '3', '4+']}
            selected={pregnancyCount}
            onSelect={setPregnancyCount}
          />
        </View>

        <View style={styles.sectionGroup}>
          <Text style={styles.groupLabel}>Risk level</Text>
          <ChipGroup options={['Normal', 'High']} selected={riskLevel} onSelect={setRiskLevel} />
        </View>

        <PrimaryButton title="Save pregnancy data" onPress={savePregnancyData} />
      </View>

      {pregnancyChecklist.map((item) => (
        <InfoCard key={item.title} title={item.title} body={item.body} tone="peach" />
      ))}
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
    borderRadius: radii.xl,
    padding: 22,
    backgroundColor: palette.surfaceMuted,
    borderWidth: 1,
    borderColor: '#EDC7A8',
    gap: 10,
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
  formCard: {
    borderRadius: radii.xl,
    padding: 20,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 16,
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
});
