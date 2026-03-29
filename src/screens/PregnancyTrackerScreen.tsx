import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { InfoCard } from '../components/InfoCard';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { pregnancyChecklist } from '../data/appContent';
import { palette, radii } from '../theme/tokens';

export function PregnancyTrackerScreen(): React.JSX.Element {
  return (
    <ScreenFrame>
      <SectionHeader
        title="Pregnancy tracker"
        subtitle="A structured weekly view for progress, symptoms, and preparation."
      />

      <View style={styles.weekCard}>
        <Text style={styles.weekLabel}>Week 24</Text>
        <Text style={styles.weekTitle}>Baby is growing stronger and movement becomes easier to notice.</Text>
        <Text style={styles.weekBody}>
          This screen is ready to expand into weekly growth notes, nutrition prompts, kick counts, and warning signs.
        </Text>
      </View>

      {pregnancyChecklist.map((item) => (
        <InfoCard key={item.title} title={item.title} body={item.body} tone="peach" />
      ))}
    </ScreenFrame>
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
});
