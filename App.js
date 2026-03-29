import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar as NativeStatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import {
  appTabs,
  babyCareItems,
  careFlow,
  educationTopics,
  keyMetrics,
  pregnancyChecklist,
  quickActions,
  reminders,
  symptomGuidance,
} from './src/content/appContent';

const palette = {
  background: '#F8F3EA',
  surface: '#FFFDF8',
  surfaceAlt: '#F7E6D5',
  primary: '#C9623B',
  primarySoft: '#F1B08A',
  secondary: '#215A5B',
  secondarySoft: '#D7EBE6',
  accent: '#E8A12F',
  text: '#1E2524',
  textMuted: '#5B6764',
  border: '#E6D7C5',
  success: '#2E6B57',
  warning: '#B36B00',
  danger: '#9F2F25',
  shadow: 'rgba(56, 34, 21, 0.08)',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.backgroundOrbOne} />
        <View style={styles.backgroundOrbTwo} />

        <View style={styles.appShell}>
          <Header />
          <View style={styles.content}>{renderScreen(activeTab)}</View>
          <TabBar activeTab={activeTab} onChange={setActiveTab} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function renderScreen(activeTab) {
  switch (activeTab) {
    case 'tracker':
      return <TrackerScreen />;
    case 'care':
      return <CareScreen />;
    case 'learn':
      return <LearnScreen />;
    case 'home':
    default:
      return <HomeScreen />;
  }
}

function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>Maternal & Child Health Companion</Text>
        <Text style={styles.title}>MamaCare+</Text>
      </View>
      <View style={styles.profileBadge}>
        <Text style={styles.profileBadgeText}>Week 24</Text>
      </View>
    </View>
  );
}

function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <HeroCard />

      <View style={styles.metricGrid}>
        {keyMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </View>

      <SectionHeader
        title="Quick actions"
        subtitle="Start with the flows mothers need most every day."
      />
      <View style={styles.actionGrid}>
        {quickActions.map((action) => (
          <ActionCard key={action.title} item={action} />
        ))}
      </View>

      <SectionHeader
        title="Upcoming care plan"
        subtitle="A calm, friendly reminder system for ANC, PNC, and baby visits."
      />
      {reminders.map((reminder) => (
        <ReminderCard key={reminder.title} item={reminder} />
      ))}
    </ScrollView>
  );
}

function TrackerScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <SectionHeader
        title="Pregnancy tracker"
        subtitle="Week-by-week guidance, symptom awareness, and self-care support."
      />

      <View style={styles.storyCard}>
        <Text style={styles.storyEyebrow}>This week with Little Star</Text>
        <Text style={styles.storyTitle}>Your baby is growing stronger every day.</Text>
        <Text style={styles.storyBody}>
          Focus on iron-rich meals, hydration, and counting movements at the same time each day.
        </Text>
      </View>

      <View style={styles.checklistCard}>
        {pregnancyChecklist.map((item, index) => (
          <View
            key={item.title}
            style={[styles.checklistRow, index === pregnancyChecklist.length - 1 && styles.checklistRowLast]}
          >
            <View style={styles.checklistMarker}>
              <Text style={styles.checklistMarkerText}>{index + 1}</Text>
            </View>
            <View style={styles.checklistCopy}>
              <Text style={styles.checklistTitle}>{item.title}</Text>
              <Text style={styles.checklistBody}>{item.body}</Text>
            </View>
          </View>
        ))}
      </View>

      <SectionHeader
        title="Baby care tracker"
        subtitle="Vaccines, growth checks, feeding support, and milestone awareness."
      />
      {babyCareItems.map((item) => (
        <SupportCard key={item.title} item={item} tone="secondary" />
      ))}
    </ScrollView>
  );
}

function CareScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <SectionHeader
        title="Symptom support"
        subtitle="A three-step guidance model that helps mothers know when to rest, monitor, or seek care."
      />
      {symptomGuidance.map((item) => (
        <GuidanceCard key={item.level} item={item} />
      ))}

      <SectionHeader
        title="Follow-up workflow"
        subtitle="No missed visit should quietly disappear from the system."
      />
      <View style={styles.timelineCard}>
        {careFlow.map((step, index) => (
          <View key={step.title} style={styles.timelineRow}>
            <View style={styles.timelineRail}>
              <View style={styles.timelineDot} />
              {index !== careFlow.length - 1 ? <View style={styles.timelineLine} /> : null}
            </View>
            <View style={styles.timelineCopy}>
              <Text style={styles.timelineTitle}>{step.title}</Text>
              <Text style={styles.timelineBody}>{step.body}</Text>
            </View>
          </View>
        ))}
      </View>

      <SupportCard
        tone="accent"
        item={{
          title: 'Emergency-ready contact panel',
          body:
            'Keep a health facility number, ambulance option, and trusted family contact one tap away inside the app.',
        }}
      />
    </ScrollView>
  );
}

function LearnScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <SectionHeader
        title="Health learning hub"
        subtitle="Short, practical education for pregnancy, postpartum recovery, and early child care."
      />
      <View style={styles.learnGrid}>
        {educationTopics.map((topic) => (
          <TopicCard key={topic.title} topic={topic} />
        ))}
      </View>

      <View style={styles.missionCard}>
        <Text style={styles.missionEyebrow}>Built for low-resource settings</Text>
        <Text style={styles.missionTitle}>Accessible, reassuring, and ready for real life.</Text>
        <Text style={styles.missionBody}>
          The first frontend pass already reflects the product direction: mobile-first screens, low-clutter
          content blocks, multilingual-friendly layouts, and room for offline-first flows later.
        </Text>
      </View>
    </ScrollView>
  );
}

function HeroCard() {
  return (
    <View style={styles.heroCard}>
      <Text style={styles.heroEyebrow}>Always with you between clinic visits</Text>
      <Text style={styles.heroTitle}>Companion care for pregnancy, baby health, and follow-up.</Text>
      <Text style={styles.heroBody}>
        See upcoming appointments, log concerns early, and keep vaccination and growth milestones in one calm
        place.
      </Text>

      <View style={styles.heroBanner}>
        <View>
          <Text style={styles.heroBannerLabel}>Next reminder</Text>
          <Text style={styles.heroBannerTitle}>ANC visit in 2 days</Text>
        </View>
        <Text style={styles.heroBannerMeta}>08:30 AM</Text>
      </View>
    </View>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
  );
}

function MetricCard({ metric }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{metric.value}</Text>
      <Text style={styles.metricLabel}>{metric.label}</Text>
    </View>
  );
}

function ActionCard({ item }) {
  return (
    <Pressable style={styles.actionCard}>
      <Text style={styles.actionTitle}>{item.title}</Text>
      <Text style={styles.actionBody}>{item.body}</Text>
    </Pressable>
  );
}

function ReminderCard({ item }) {
  return (
    <View style={styles.reminderCard}>
      <View style={styles.reminderRow}>
        <Text style={styles.reminderTitle}>{item.title}</Text>
        <Text style={styles.reminderMeta}>{item.when}</Text>
      </View>
      <Text style={styles.reminderBody}>{item.body}</Text>
      <View style={styles.reminderTag}>
        <Text style={styles.reminderTagText}>{item.tag}</Text>
      </View>
    </View>
  );
}

function GuidanceCard({ item }) {
  return (
    <View style={styles.guidanceCard}>
      <View style={[styles.guidancePill, styles[`guidancePill${item.tone}`]]}>
        <Text style={[styles.guidancePillText, styles[`guidancePillText${item.tone}`]]}>{item.level}</Text>
      </View>
      <Text style={styles.guidanceTitle}>{item.title}</Text>
      <Text style={styles.guidanceBody}>{item.body}</Text>
    </View>
  );
}

function SupportCard({ item, tone }) {
  return (
    <View
      style={[
        styles.supportCard,
        tone === 'secondary' && styles.supportCardSecondary,
        tone === 'accent' && styles.supportCardAccent,
      ]}
    >
      <Text style={styles.supportTitle}>{item.title}</Text>
      <Text style={styles.supportBody}>{item.body}</Text>
    </View>
  );
}

function TopicCard({ topic }) {
  return (
    <View style={styles.topicCard}>
      <Text style={styles.topicTitle}>{topic.title}</Text>
      <Text style={styles.topicBody}>{topic.body}</Text>
    </View>
  );
}

function TabBar({ activeTab, onChange }) {
  return (
    <View style={styles.tabBar}>
      {appTabs.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={[styles.tabButton, active && styles.tabButtonActive]}
          >
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  appShell: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? NativeStatusBar.currentHeight ?? 12 : 0,
  },
  backgroundOrbOne: {
    position: 'absolute',
    top: 32,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#F2C8A8',
    opacity: 0.3,
  },
  backgroundOrbTwo: {
    position: 'absolute',
    bottom: 96,
    left: -48,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#D7EBE6',
    opacity: 0.55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: palette.textMuted,
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: palette.text,
  },
  profileBadge: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
  },
  profileBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.secondary,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 18,
  },
  heroCard: {
    backgroundColor: palette.secondary,
    borderRadius: 28,
    padding: 22,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  heroEyebrow: {
    color: '#D0EEE7',
    fontSize: 12,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: '#FFF8F0',
    marginBottom: 12,
  },
  heroBody: {
    fontSize: 15,
    lineHeight: 24,
    color: '#DDE7E5',
  },
  heroBanner: {
    marginTop: 18,
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 253, 248, 0.14)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroBannerLabel: {
    fontSize: 12,
    color: '#CFE4DE',
    marginBottom: 6,
  },
  heroBannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF8F0',
  },
  heroBannerMeta: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFE8C5',
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '47%',
    backgroundColor: palette.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: palette.border,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: '700',
    color: palette.primary,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: palette.textMuted,
  },
  sectionHeader: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: palette.text,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
    minHeight: 132,
    borderRadius: 22,
    padding: 18,
    backgroundColor: palette.surfaceAlt,
    borderWidth: 1,
    borderColor: '#EDC7A8',
  },
  actionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 10,
  },
  actionBody: {
    fontSize: 14,
    lineHeight: 21,
    color: palette.textMuted,
  },
  reminderCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 10,
  },
  reminderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  reminderTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  reminderMeta: {
    fontSize: 13,
    color: palette.secondary,
    fontWeight: '700',
  },
  reminderBody: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  reminderTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: palette.secondarySoft,
  },
  reminderTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.secondary,
  },
  storyCard: {
    borderRadius: 28,
    padding: 22,
    backgroundColor: palette.surfaceAlt,
    borderWidth: 1,
    borderColor: '#EDC7A8',
    gap: 10,
  },
  storyEyebrow: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    color: palette.primary,
  },
  storyTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    color: palette.text,
  },
  storyBody: {
    fontSize: 15,
    lineHeight: 24,
    color: palette.textMuted,
  },
  checklistCard: {
    backgroundColor: palette.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  checklistRow: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  checklistRowLast: {
    borderBottomWidth: 0,
  },
  checklistMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: palette.secondarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checklistMarkerText: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.secondary,
  },
  checklistCopy: {
    flex: 1,
    gap: 6,
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  checklistBody: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  supportCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 8,
  },
  supportCardSecondary: {
    backgroundColor: palette.secondarySoft,
    borderColor: '#B9D8D0',
  },
  supportCardAccent: {
    backgroundColor: '#FFF1D7',
    borderColor: '#F0CF8F',
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  supportBody: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  guidanceCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 10,
  },
  guidancePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  guidancePillnormal: {
    backgroundColor: '#E2F2E8',
  },
  guidancePillmonitor: {
    backgroundColor: '#FFF0D2',
  },
  guidancePillurgent: {
    backgroundColor: '#F9DEDB',
  },
  guidancePillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  guidancePillTextnormal: {
    color: palette.success,
  },
  guidancePillTextmonitor: {
    color: palette.warning,
  },
  guidancePillTexturgent: {
    color: palette.danger,
  },
  guidanceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  guidanceBody: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  timelineCard: {
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 14,
  },
  timelineRail: {
    alignItems: 'center',
    width: 18,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 18,
    backgroundColor: palette.primary,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: palette.border,
    marginTop: 8,
    marginBottom: -8,
  },
  timelineCopy: {
    flex: 1,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 6,
  },
  timelineBody: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  learnGrid: {
    gap: 12,
  },
  topicCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 8,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  topicBody: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  missionCard: {
    borderRadius: 28,
    padding: 22,
    backgroundColor: palette.primary,
    gap: 10,
  },
  missionEyebrow: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    color: '#FDE6D8',
  },
  missionTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    color: '#FFF8F0',
  },
  missionBody: {
    fontSize: 15,
    lineHeight: 24,
    color: '#FFF0E4',
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 10,
    padding: 8,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 253, 248, 0.96)',
    borderWidth: 1,
    borderColor: palette.border,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: palette.secondary,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.textMuted,
  },
  tabLabelActive: {
    color: '#FFF8F0',
  },
});
