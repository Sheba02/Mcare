import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { symptomLevels } from '../data/appContent';
import { palette, radii } from '../theme/tokens';
import type { RootScreenProps } from '../types/navigation';

export function SymptomCheckerScreen({
  navigation,
}: RootScreenProps<'SymptomChecker'>): React.JSX.Element {
  return (
    <ScreenFrame>
      <SectionHeader
        title="Symptom checker"
        subtitle="Structured triage with calm language and clear urgency signals."
      />
      {symptomLevels.map((item, index) => (
        <View key={item.level} style={styles.card}>
          <View style={[styles.levelPill, index === 0 ? styles.normal : index === 1 ? styles.monitor : styles.urgent]}>
            <Text style={[styles.levelText, index === 0 ? styles.normalText : index === 1 ? styles.monitorText : styles.urgentText]}>
              {item.level}
            </Text>
          </View>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      ))}
      <PrimaryButton title="Close" onPress={() => navigation.goBack()} />
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
    gap: 12,
  },
  levelPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '800',
  },
  normal: {
    backgroundColor: '#E1F2E8',
  },
  monitor: {
    backgroundColor: '#FFF0D2',
  },
  urgent: {
    backgroundColor: '#F9DEDB',
  },
  normalText: {
    color: palette.success,
  },
  monitorText: {
    color: palette.warning,
  },
  urgentText: {
    color: palette.danger,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
});
