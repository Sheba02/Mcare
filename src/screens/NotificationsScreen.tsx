import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ListRow } from '../components/ListRow';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { useAppLanguage } from '../context/AppLanguageContext';
import { getLocalizedContent } from '../data/localizedContent';
import { palette, radii } from '../theme/tokens';

export function NotificationsScreen(): React.JSX.Element {
  const { language, t } = useAppLanguage();
  const content = getLocalizedContent(language);

  return (
    <ScreenFrame>
      <SectionHeader
        title={t('notificationsTitle')}
        subtitle={t('notificationsSubtitle')}
      />
      <View style={styles.stream}>
        {content.alertReminders.map((item, index) => (
          <ListRow
            key={item.title}
            title={item.title}
            subtitle={item.body}
            meta={
              index === 0
                ? content.notificationMeta.priority
                : index === 1
                  ? content.notificationMeta.today
                  : content.notificationMeta.reminder
            }
            badge={index === 3 ? content.notificationMeta.urgent : undefined}
          />
        ))}
      </View>
      <View style={styles.notesBlock}>
        <Text style={styles.notesEyebrow}>{content.notificationMeta.reminderValue}</Text>
        {content.sponsorSignals.map((signal) => (
          <Text key={signal} style={styles.notesItem}>
            {signal}
          </Text>
        ))}
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  stream: {
    backgroundColor: palette.white,
    borderRadius: radii.lg,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: palette.border,
  },
  notesBlock: {
    gap: 10,
    paddingTop: 4,
  },
  notesEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: palette.primaryDeep,
  },
  notesItem: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
});
