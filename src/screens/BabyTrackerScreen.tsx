import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { InfoCard } from '../components/InfoCard';
import { InputField } from '../components/InputField';
import { ListRow } from '../components/ListRow';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { useAppLanguage, type AppLanguage } from '../context/AppLanguageContext';
import { getLocalizedContent } from '../data/localizedContent';
import { palette, radii } from '../theme/tokens';

type BabySection = 'immunization' | 'growth' | 'guidance';

type SavedImmunization = {
  vaccineIndex: number;
  date: string;
};

type LatestEntry =
  | { type: 'none' }
  | { type: 'immunization'; vaccineIndex: number; date: string }
  | { type: 'growth'; weightKg: string; lengthCm: string; headCircumferenceCm: string; date: string }
  | { type: 'guidance'; topicIndex: number; note: string };

type BabyCopy = {
  latestUpdate: string;
  parentEntrySummary: string;
  emptySummary: string;
  immunizationTitle: string;
  immunizationBody: string;
  growthTitle: string;
  growthBody: string;
  guidanceTitle: string;
  guidanceBody: string;
  vaccineSchedule: string;
  vaccineScheduleBody: string;
  duePrefix: string;
  saved: string;
  pending: string;
  selectedVaccine: string;
  dateTaken: string;
  dateTakenCaption: string;
  saveImmunization: string;
  savedVaccines: string;
  noVaccines: string;
  takenOn: string;
  growthEntry: string;
  growthEntryBody: string;
  weight: string;
  length: string;
  headCircumference: string;
  measurementDate: string;
  saveGrowth: string;
  guidanceEntry: string;
  guidanceEntryBody: string;
  guidanceNote: string;
  guidanceCaption: string;
  saveGuidance: string;
};

const babyCopy: Record<AppLanguage, BabyCopy> = {
  English: {
    latestUpdate: 'Latest update',
    parentEntrySummary: 'Parent entry summary',
    emptySummary: 'No baby data recorded yet. Tap a section below to start.',
    immunizationTitle: 'Immunization',
    immunizationBody: 'Record which vaccine has already been given.',
    growthTitle: 'Weight and growth',
    growthBody: 'Enter weight, length, and head circumference.',
    guidanceTitle: 'Caregiver guidance',
    guidanceBody: 'Save what support or advice was given to the parent.',
    vaccineSchedule: 'Baby vaccine schedule',
    vaccineScheduleBody: 'Choose a vaccine from the schedule, enter the date it was taken, and save it so it stays recorded.',
    duePrefix: 'Due',
    saved: 'Saved',
    pending: 'Pending',
    selectedVaccine: 'Selected vaccine',
    dateTaken: 'Date taken',
    dateTakenCaption: 'Use the clinic date or the date the parent confirms the vaccine was received.',
    saveImmunization: 'Save immunization',
    savedVaccines: 'Saved vaccines',
    noVaccines: 'No vaccines saved yet.',
    takenOn: 'Taken on',
    growthEntry: 'Weight and growth entry',
    growthEntryBody: 'Parents or providers can keep the latest baby growth numbers here.',
    weight: 'Weight (kg)',
    length: 'Length (cm)',
    headCircumference: 'Head circumference (cm)',
    measurementDate: 'Measurement date',
    saveGrowth: 'Save growth entry',
    guidanceEntry: 'Caregiver guidance entry',
    guidanceEntryBody: 'Keep a record of what support was given so follow-up care stays clear.',
    guidanceNote: 'Guidance note',
    guidanceCaption: 'This can capture education, next steps, or signs the caregiver was told to watch.',
    saveGuidance: 'Save guidance note',
  },
  Kiswahili: {
    latestUpdate: 'Taarifa ya mwisho',
    parentEntrySummary: 'Muhtasari wa taarifa ya mzazi',
    emptySummary: 'Bado hakuna taarifa za mtoto zilizohifadhiwa. Gusa sehemu hapa chini kuanza.',
    immunizationTitle: 'Chanjo',
    immunizationBody: 'Rekodi chanjo ambayo tayari mtoto amepewa.',
    growthTitle: 'Uzito na ukuaji',
    growthBody: 'Weka uzito, urefu, na mzunguko wa kichwa.',
    guidanceTitle: 'Mwongozo kwa mlezi',
    guidanceBody: 'Hifadhi ushauri au msaada uliotolewa kwa mzazi.',
    vaccineSchedule: 'Ratiba ya chanjo ya mtoto',
    vaccineScheduleBody: 'Chagua chanjo kwenye ratiba, weka tarehe ilipotolewa, kisha uiweke ihifadhiwe.',
    duePrefix: 'Inatakiwa',
    saved: 'Imehifadhiwa',
    pending: 'Inasubiri',
    selectedVaccine: 'Chanjo iliyochaguliwa',
    dateTaken: 'Tarehe ilipotolewa',
    dateTakenCaption: 'Tumia tarehe ya kliniki au tarehe ambayo mzazi anathibitisha chanjo ilipokelewa.',
    saveImmunization: 'Hifadhi chanjo',
    savedVaccines: 'Chanjo zilizohifadhiwa',
    noVaccines: 'Bado hakuna chanjo zilizohifadhiwa.',
    takenOn: 'Ilitolewa tarehe',
    growthEntry: 'Taarifa ya uzito na ukuaji',
    growthEntryBody: 'Wazazi au wahudumu wanaweza kuweka vipimo vya hivi karibuni hapa.',
    weight: 'Uzito (kg)',
    length: 'Urefu (cm)',
    headCircumference: 'Mzunguko wa kichwa (cm)',
    measurementDate: 'Tarehe ya kipimo',
    saveGrowth: 'Hifadhi kipimo cha ukuaji',
    guidanceEntry: 'Taarifa ya mwongozo kwa mlezi',
    guidanceEntryBody: 'Hifadhi kile usaidizi uliotolewa ili ufuatiliaji ubaki wazi.',
    guidanceNote: 'Maelezo ya mwongozo',
    guidanceCaption: 'Hapa unaweza kuweka elimu, hatua zinazofuata, au dalili ambazo mlezi alitakiwa kuangalia.',
    saveGuidance: 'Hifadhi mwongozo',
  },
  Kinyarwanda: {
    latestUpdate: 'Amakuru aheruka',
    parentEntrySummary: 'Incamake y’ibyanditswe n’umubyeyi',
    emptySummary: 'Nta makuru y’umwana arabikwa. Kanda igice kiri hasi utangire.',
    immunizationTitle: 'Inkingo',
    immunizationBody: 'Andika urukingo umwana yamaze gufata.',
    growthTitle: 'Ibiro n’imikurire',
    growthBody: 'Andika ibiro, uburebure, n’umuzenguruko w’umutwe.',
    guidanceTitle: 'Inama ku murezi',
    guidanceBody: 'Bika ubufasha cyangwa inama byahawe umubyeyi.',
    vaccineSchedule: 'Ingengabihe y’inkingo z’umwana',
    vaccineScheduleBody: 'Hitamo urukingo, andika itariki rwafatiweho, ubundi urubike kugira ngo rugumeho.',
    duePrefix: 'Riteganyijwe',
    saved: 'Byabitswe',
    pending: 'Bitegerejwe',
    selectedVaccine: 'Urukingo rwatoranyijwe',
    dateTaken: 'Itariki rwafatiweho',
    dateTakenCaption: 'Koresha itariki ya kliniki cyangwa umubyeyi yemejeho ko urukingo rwafashwe.',
    saveImmunization: 'Bika urukingo',
    savedVaccines: 'Inkingo zabitswe',
    noVaccines: 'Nta nkingo zirabikwa.',
    takenOn: 'Rwafashwe ku',
    growthEntry: 'Amakuru y’ibiro n’imikurire',
    growthEntryBody: 'Ababyeyi cyangwa abita ku mwana bashobora kubika ibipimo bishya hano.',
    weight: 'Ibiro (kg)',
    length: 'Uburebure (cm)',
    headCircumference: 'Umuzenguruko w’umutwe (cm)',
    measurementDate: 'Itariki yo gupima',
    saveGrowth: 'Bika ibipimo',
    guidanceEntry: 'Amakuru y’inama ku murezi',
    guidanceEntryBody: 'Bika ubufasha bwatanzwe kugira ngo gukurikirana bigume bisobanutse.',
    guidanceNote: 'Icyitonderwa cy’inama',
    guidanceCaption: 'Aha ushobora kwandika inyigisho, intambwe zikurikiraho, cyangwa ibimenyetso umurezi yabwiwe kwitondera.',
    saveGuidance: 'Bika inama',
  },
};

function buildSummary(language: AppLanguage, latestEntry: LatestEntry): string {
  const copy = babyCopy[language];
  const content = getLocalizedContent(language);

  if (latestEntry.type === 'none') {
    return copy.emptySummary;
  }

  if (latestEntry.type === 'immunization') {
    const vaccine = content.babyVaccineSchedule[latestEntry.vaccineIndex];
    return `${vaccine.name} ${copy.saved.toLowerCase()}${latestEntry.date ? ` ${copy.takenOn.toLowerCase()} ${latestEntry.date}` : ''}.`;
  }

  if (latestEntry.type === 'growth') {
    return `${copy.growthEntry} ${latestEntry.date ? `(${latestEntry.date})` : ''}: ${latestEntry.weightKg || '-'} kg, ${latestEntry.lengthCm || '-'} cm, ${latestEntry.headCircumferenceCm || '-'} cm.`;
  }

  const topic = content.guidanceTopics[latestEntry.topicIndex];
  return latestEntry.note
    ? `${topic}: ${latestEntry.note}`
    : `${topic} ${copy.saved.toLowerCase()} successfully.`;
}

export function BabyTrackerScreen(): React.JSX.Element {
  const { language, t } = useAppLanguage();
  const content = getLocalizedContent(language);
  const copy = babyCopy[language];
  const [activeSection, setActiveSection] = useState<BabySection>('immunization');
  const [selectedVaccineIndex, setSelectedVaccineIndex] = useState(0);
  const [immunizationDate, setImmunizationDate] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [lengthCm, setLengthCm] = useState('');
  const [headCircumferenceCm, setHeadCircumferenceCm] = useState('');
  const [measurementDate, setMeasurementDate] = useState('');
  const [guidanceTopicIndex, setGuidanceTopicIndex] = useState(0);
  const [guidanceNote, setGuidanceNote] = useState('');
  const [savedImmunizations, setSavedImmunizations] = useState<SavedImmunization[]>([]);
  const [latestEntry, setLatestEntry] = useState<LatestEntry>({ type: 'none' });

  const savedMessage = useMemo(
    () => buildSummary(language, latestEntry),
    [language, latestEntry]
  );

  const saveImmunization = (): void => {
    const savedDate = immunizationDate.trim() || '2026-03-31';

    setSavedImmunizations((current) => {
      const withoutCurrent = current.filter((item) => item.vaccineIndex !== selectedVaccineIndex);

      return [...withoutCurrent, { vaccineIndex: selectedVaccineIndex, date: savedDate }];
    });
    setLatestEntry({ type: 'immunization', vaccineIndex: selectedVaccineIndex, date: savedDate });
    setImmunizationDate('');
  };

  const saveGrowth = (): void => {
    setLatestEntry({
      type: 'growth',
      weightKg,
      lengthCm,
      headCircumferenceCm,
      date: measurementDate,
    });
  };

  const saveGuidance = (): void => {
    setLatestEntry({ type: 'guidance', topicIndex: guidanceTopicIndex, note: guidanceNote.trim() });
  };

  return (
    <ScreenFrame>
      <SectionHeader title={t('babyTracker')} subtitle={t('babySubtitle')} />

      <InfoCard eyebrow={copy.latestUpdate} title={copy.parentEntrySummary} body={savedMessage} tone="teal" />

      <View style={styles.sectionTabs}>
        <TrackerSectionCard
          title={copy.immunizationTitle}
          description={copy.immunizationBody}
          active={activeSection === 'immunization'}
          onPress={() => setActiveSection('immunization')}
        />
        <TrackerSectionCard
          title={copy.growthTitle}
          description={copy.growthBody}
          active={activeSection === 'growth'}
          onPress={() => setActiveSection('growth')}
        />
        <TrackerSectionCard
          title={copy.guidanceTitle}
          description={copy.guidanceBody}
          active={activeSection === 'guidance'}
          onPress={() => setActiveSection('guidance')}
        />
      </View>

      {activeSection === 'immunization' ? (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>{copy.vaccineSchedule}</Text>
          <Text style={styles.formBody}>{copy.vaccineScheduleBody}</Text>

          <View style={styles.scheduleList}>
            {content.babyVaccineSchedule.map((item, index) => {
              const isSelected = index === selectedVaccineIndex;
              const isSaved = savedImmunizations.some((entry) => entry.vaccineIndex === index);

              return (
                <Pressable
                  key={`${item.name}-${item.due}`}
                  onPress={() => setSelectedVaccineIndex(index)}
                  style={[styles.scheduleRow, isSelected && styles.scheduleRowActive]}
                >
                  <View style={styles.scheduleCopy}>
                    <Text style={[styles.scheduleTitle, isSelected && styles.scheduleTitleActive]}>{item.name}</Text>
                    <Text style={[styles.scheduleDue, isSelected && styles.scheduleDueActive]}>
                      {copy.duePrefix}: {item.due}
                    </Text>
                  </View>
                  <Text style={[styles.scheduleStatus, isSaved && styles.scheduleStatusSaved]}>
                    {isSaved ? copy.saved : copy.pending}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.selectedLabel}>
            {copy.selectedVaccine}: {content.babyVaccineSchedule[selectedVaccineIndex]?.name}
          </Text>

          <InputField
            label={copy.dateTaken}
            placeholder="2026-03-31"
            value={immunizationDate}
            onChangeText={setImmunizationDate}
            caption={copy.dateTakenCaption}
          />

          <PrimaryButton title={copy.saveImmunization} onPress={saveImmunization} />

          <View style={styles.savedSection}>
            <Text style={styles.savedSectionTitle}>{copy.savedVaccines}</Text>
            {savedImmunizations.length === 0 ? (
              <Text style={styles.savedEmpty}>{copy.noVaccines}</Text>
            ) : (
              <View style={styles.savedList}>
                {savedImmunizations.map((item) => {
                  const vaccine = content.babyVaccineSchedule[item.vaccineIndex];

                  return (
                    <ListRow
                      key={`${item.vaccineIndex}-${item.date}`}
                      title={vaccine.name}
                      subtitle={`${copy.takenOn} ${item.date}`}
                      meta={vaccine.due}
                      badge={copy.saved}
                      compact
                    />
                  );
                })}
              </View>
            )}
          </View>
        </View>
      ) : null}

      {activeSection === 'growth' ? (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>{copy.growthEntry}</Text>
          <Text style={styles.formBody}>{copy.growthEntryBody}</Text>

          <InputField
            label={copy.weight}
            placeholder="4.8"
            value={weightKg}
            onChangeText={setWeightKg}
            keyboardType="decimal-pad"
          />
          <InputField
            label={copy.length}
            placeholder="57"
            value={lengthCm}
            onChangeText={setLengthCm}
            keyboardType="decimal-pad"
          />
          <InputField
            label={copy.headCircumference}
            placeholder="39"
            value={headCircumferenceCm}
            onChangeText={setHeadCircumferenceCm}
            keyboardType="decimal-pad"
          />
          <InputField
            label={copy.measurementDate}
            placeholder="2026-03-29"
            value={measurementDate}
            onChangeText={setMeasurementDate}
          />

          <PrimaryButton title={copy.saveGrowth} onPress={saveGrowth} />
        </View>
      ) : null}

      {activeSection === 'guidance' ? (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>{copy.guidanceEntry}</Text>
          <Text style={styles.formBody}>{copy.guidanceEntryBody}</Text>

          <ChipGroup
            options={content.guidanceTopics}
            selected={content.guidanceTopics[guidanceTopicIndex]}
            onSelect={(value) => setGuidanceTopicIndex(content.guidanceTopics.indexOf(value))}
          />
          <InputField
            label={copy.guidanceNote}
            placeholder="Breastfeed every 2-3 hours and watch for poor latch."
            value={guidanceNote}
            onChangeText={setGuidanceNote}
            autoCapitalize="sentences"
            caption={copy.guidanceCaption}
          />

          <PrimaryButton title={copy.saveGuidance} onPress={saveGuidance} />
        </View>
      ) : null}

      {content.babyHighlights.map((item, index) => (
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
    color: '#FFE6EC',
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
  scheduleList: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    backgroundColor: palette.white,
  },
  scheduleRowActive: {
    backgroundColor: palette.brandSoft,
  },
  scheduleCopy: {
    flex: 1,
    gap: 4,
  },
  scheduleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.text,
  },
  scheduleTitleActive: {
    color: palette.primaryDeep,
  },
  scheduleDue: {
    fontSize: 13,
    color: palette.textMuted,
  },
  scheduleDueActive: {
    color: palette.primaryDeep,
  },
  scheduleStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.warning,
  },
  scheduleStatusSaved: {
    color: palette.secondary,
  },
  selectedLabel: {
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
    backgroundColor: palette.surfaceMuted,
    borderWidth: 1,
    borderColor: palette.border,
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
  savedSection: {
    gap: 10,
  },
  savedSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: palette.text,
  },
  savedEmpty: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  savedList: {
    backgroundColor: palette.surface,
    borderRadius: radii.lg,
    paddingHorizontal: 16,
  },
});
