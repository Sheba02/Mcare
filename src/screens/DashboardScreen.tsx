import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { InfoCard } from '../components/InfoCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { appointments, dashboardStats, quickActions } from '../data/appContent';
import { gradients, palette, radii } from '../theme/tokens';

type DashboardScreenProps = {
  onOpenProfile: () => void;
  onOpenSymptomChecker: () => void;
};

export function DashboardScreen({
  onOpenProfile,
  onOpenSymptomChecker,
}: DashboardScreenProps): React.JSX.Element {
  return (
    <ScreenFrame>
      <LinearGradient colors={gradients.hero} style={styles.hero}>
        <Text style={styles.eyebrow}>Good morning, Neema</Text>
        <Text style={styles.heroTitle}>Your care journey is organized, visible, and calm.</Text>
        <Text style={styles.heroBody}>
          Today’s view keeps appointments, symptom support, and child health tracking in one sponsor-worthy dashboard.
        </Text>
      </LinearGradient>

      <View style={styles.statsGrid}>
        {dashboardStats.map((item) => (
          <View key={item.label} style={styles.statCard}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="Quick actions" subtitle="Fast routes to the flows mothers use most." />
      <View style={styles.actionList}>
        <PrimaryButton
          title={quickActions[0]}
          onPress={onOpenSymptomChecker}
          icon={<MaterialCommunityIcons name="heart-pulse" size={18} color={palette.white} />}
        />
        <PrimaryButton
          title={quickActions[3]}
          onPress={onOpenProfile}
          variant="outline"
          icon={<MaterialCommunityIcons name="account-circle-outline" size={18} color={palette.text} />}
        />
      </View>

      <SectionHeader title="Upcoming visits" subtitle="A clinic-friendly timeline for reminders and follow-up." />
      {appointments.map((item, index) => (
        <InfoCard
          key={item.id}
          eyebrow={item.status}
          title={item.title}
          body={`${item.time} • ${item.location}\n${item.summary}`}
          tone={index === 0 ? 'teal' : index === 1 ? 'accent' : 'neutral'}
        />
      ))}
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radii.xl,
    padding: 22,
    gap: 10,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#D9EEE8',
  },
  heroTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: palette.white,
  },
  heroBody: {
    fontSize: 15,
    lineHeight: 24,
    color: '#E3EFEC',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '47%',
    borderRadius: radii.lg,
    padding: 18,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: palette.primary,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 13,
    lineHeight: 20,
    color: palette.textMuted,
  },
  actionList: {
    gap: 12,
  },
});
