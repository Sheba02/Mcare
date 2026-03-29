import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { InfoCard } from '../components/InfoCard';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { babyHighlights } from '../data/appContent';
import { palette, radii } from '../theme/tokens';

type BabySection = 'immunization' | 'growth' | 'guidance';

const vaccineOptions = ['BCG', 'OPV 1', 'Penta 1', 'Penta 2', 'Penta 3', 'Measles'];
const guidanceTopics = ['Breastfeeding', 'Sleep routine', 'Danger signs', 'Clinic return plan'];

export function BabyTrackerScreen(): React.JSX.Element {
  const [activeSection, setActiveSection] = useState<BabySection>('immunization');
  const [selectedVaccine, setSelectedVaccine] = useState('BCG');
  const [immunizationDate, setImmunizationDate] = useState('');
  const [immunizationStatus, setImmunizationStatus] = useState<'Given' | 'Pending'>('Given');
  const [weightKg, setWeightKg] = useState('');
  const [lengthCm, setLengthCm] = useState('');
  const [headCircumferenceCm, setHeadCircumferenceCm] = useState('');
  const [measurementDate, setMeasurementDate] = useState('');
  const [guidanceTopic, setGuidanceTopic] = useState('Breastfeeding');
  const [guidanceNote, setGuidanceNote] = useState('');
  const [savedMessage, setSavedMessage] = useState('No baby data recorded yet. Tap a section below to start.');

  const saveImmunization = (): void => {
    setSavedMessage(`${selectedVaccine} marked as ${immunizationStatus.toLowerCase()}${immunizationDate ? ` on ${immunizationDate}` : ''}.`);
  };

  const saveGrowth = (): void => {
    setSavedMessage(
      `Growth entry saved${measurementDate ? ` for ${measurementDate}` : ''}: ${weightKg || '-'} kg, ${lengthCm || '-'} cm, head ${headCircumferenceCm || '-'} cm.`
    );
  };

  const saveGuidance = (): void => {
    setSavedMessage(
      `${guidanceTopic} guidance saved${guidanceNote ? `: ${guidanceNote}` : ' for the caregiver.'}`
    );
  };

  return (
    <ScreenFrame>
      <SectionHeader
        title="Baby tracker"
        subtitle="Immunizations, growth monitoring, feeding notes, and developmental milestones."
      />

      <InfoCard
        eyebrow="Latest update"
        title="Parent entry summary"
        body={savedMessage}
        tone="teal"
      />

      <View style={styles.sectionTabs}>
        <TrackerSectionCard
          title="Immunization"
          description="Record which vaccine has already been given."
          active={activeSection === 'immunization'}
          onPress={() => setActiveSection('immunization')}
        />
        <TrackerSectionCard
          title="Weight and growth"
          description="Enter weight, length, and head circumference."
          active={activeSection === 'growth'}
          onPress={() => setActiveSection('growth')}
        />
        <TrackerSectionCard
          title="Caregiver guidance"
          description="Save what support or advice was given to the parent."
          active={activeSection === 'guidance'}
          onPress={() => setActiveSection('guidance')}
        />
      </View>

      {activeSection === 'immunization' ? (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Immunization entry</Text>
          <Text style={styles.formBody}>Tap the vaccine that was given, mark the status, and save the record.</Text>

          <ChipGroup
            options={vaccineOptions}
            selected={selectedVaccine}
            onSelect={setSelectedVaccine}
          />
          <ChipGroup
            options={['Given', 'Pending']}
            selected={immunizationStatus}
            onSelect={(value) => setImmunizationStatus(value as 'Given' | 'Pending')}
          />

          <InputField
            label="Date"
            placeholder="March 29, 2026"
            value={immunizationDate}
            onChangeText={setImmunizationDate}
            autoCapitalize="words"
            caption="Use the clinic date or the date the parent confirms the vaccine was received."
          />

          <PrimaryButton title="Save immunization" onPress={saveImmunization} />
        </View>
      ) : null}

      {activeSection === 'growth' ? (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Weight and growth entry</Text>
          <Text style={styles.formBody}>Parents or providers can keep the latest baby growth numbers here.</Text>

          <InputField
            label="Weight (kg)"
            placeholder="4.8"
            value={weightKg}
            onChangeText={setWeightKg}
            keyboardType="decimal-pad"
          />
          <InputField
            label="Length (cm)"
            placeholder="57"
            value={lengthCm}
            onChangeText={setLengthCm}
            keyboardType="decimal-pad"
          />
          <InputField
            label="Head circumference (cm)"
            placeholder="39"
            value={headCircumferenceCm}
            onChangeText={setHeadCircumferenceCm}
            keyboardType="decimal-pad"
          />
          <InputField
            label="Measurement date"
            placeholder="March 29, 2026"
            value={measurementDate}
            onChangeText={setMeasurementDate}
            autoCapitalize="words"
          />

          <PrimaryButton title="Save growth entry" onPress={saveGrowth} />
        </View>
      ) : null}

      {activeSection === 'guidance' ? (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Caregiver guidance entry</Text>
          <Text style={styles.formBody}>Keep a record of what support was given so follow-up care stays clear.</Text>

          <ChipGroup
            options={guidanceTopics}
            selected={guidanceTopic}
            onSelect={setGuidanceTopic}
          />
          <InputField
            label="Guidance note"
            placeholder="Breastfeed every 2-3 hours and watch for poor latch."
            value={guidanceNote}
            onChangeText={setGuidanceNote}
            autoCapitalize="sentences"
            caption="This can capture education, next steps, or signs the caregiver was told to watch."
          />

          <PrimaryButton title="Save guidance note" onPress={saveGuidance} />
        </View>
      ) : null}

      {babyHighlights.map((item, index) => (
        <InfoCard
          key={item.title}
          title={item.title}
          body={item.body}
          tone={index === 0 ? 'accent' : index === 1 ? 'teal' : 'neutral'}
        />
      ))}
    </ScreenFrame>
  );
}

type TrackerSectionCardProps = {
  title: string;
  description: string;
  active: boolean;
  onPress: () => void;
};

function TrackerSectionCard({
  title,
  description,
  active,
  onPress,
}: TrackerSectionCardProps): React.JSX.Element {
  return (
    <Pressable onPress={onPress} style={[styles.sectionCard, active && styles.sectionCardActive]}>
      <Text style={[styles.sectionCardTitle, active && styles.sectionCardTitleActive]}>{title}</Text>
      <Text style={[styles.sectionCardBody, active && styles.sectionCardBodyActive]}>{description}</Text>
    </Pressable>
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
        const isActive = option === selected;

        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTabs: {
    gap: 12,
  },
  sectionCard: {
    borderRadius: radii.lg,
    padding: 18,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 8,
  },
  sectionCardActive: {
    backgroundColor: palette.secondary,
    borderColor: palette.secondary,
  },
  sectionCardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: palette.text,
  },
  sectionCardTitleActive: {
    color: palette.white,
  },
  sectionCardBody: {
    fontSize: 14,
    lineHeight: 21,
    color: palette.textMuted,
  },
  sectionCardBodyActive: {
    color: '#D8EBE7',
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
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderRadius: radii.pill,
    backgroundColor: palette.surfaceMuted,
    borderWidth: 1,
    borderColor: '#EDC7A8',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: palette.primary,
    borderColor: palette.primary,
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
