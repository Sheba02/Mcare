import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { ListRow } from '../components/ListRow';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { useAppLanguage } from '../context/AppLanguageContext';
import { getLocalizedContent } from '../data/localizedContent';
import { gradients, palette, radii } from '../theme/tokens';

type DashboardScreenProps = {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenSymptomChecker: () => void;
};

export function DashboardScreen({
  onOpenNotifications,
  onOpenProfile,
  onOpenSymptomChecker,
}: DashboardScreenProps): React.JSX.Element {
  const { language, t } = useAppLanguage();
  const content = getLocalizedContent(language);
  const notificationCount = content.alertReminders.length;

  return (
    <ScreenFrame>
      <View style={styles.topBar}>
        <Pressable onPress={onOpenProfile} style={styles.profileButton}>
          <MaterialCommunityIcons name="account-circle-outline" size={24} color={palette.text} />
        </Pressable>
        <View style={styles.topBarActions}>
          <Pressable onPress={onOpenNotifications} style={styles.notificationButton}>
            <MaterialCommunityIcons name="bell-outline" size={22} color={palette.text} />
            {notificationCount > 0 ? (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{notificationCount}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>
      </View>

      <LinearGradient colors={gradients.hero} style={styles.hero}>
        <Text style={styles.eyebrow}>{t('homeGreeting')}</Text>
        <Text style={styles.heroTitle}>{t('homeTitle')}</Text>
        <Text style={styles.heroBody}>{t('homeBody')}</Text>
      </LinearGradient>

      <View style={styles.statsGrid}>
        {content.dashboardStats.map((item) => (
          <View key={item.label} style={styles.statCard}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title={t('upcomingVisits')} subtitle={t('upcomingVisitsSubtitle')} />
      <View style={styles.visitList}>
        {content.appointments.map((item) => (
          <ListRow
            key={item.id}
            title={item.title}
            subtitle={`${item.location}. ${item.summary}`}
            meta={item.time}
            badge={item.status}
          />
        ))}
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.primary,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: palette.white,
  },
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
    color: '#FFE4EA',
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
    color: '#FFE9EE',
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
  visitList: {
    backgroundColor: palette.white,
    borderRadius: radii.lg,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: palette.border,
  },
});
