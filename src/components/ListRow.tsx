import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { palette } from '../theme/tokens';

type ListRowProps = {
  title: string;
  subtitle: string;
  meta?: string;
  badge?: string;
  compact?: boolean;
};

export function ListRow({
  title,
  subtitle,
  meta,
  badge,
  compact = false,
}: ListRowProps): React.JSX.Element {
  return (
    <View style={[styles.row, compact && styles.rowCompact]}>
      <View style={styles.copy}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {badge ? <Text style={styles.badge}>{badge}</Text> : null}
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {meta ? <Text style={styles.meta}>{meta}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  rowCompact: {
    paddingVertical: 12,
  },
  copy: {
    flex: 1,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  meta: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.primaryDeep,
    marginTop: 2,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    color: palette.secondary,
    backgroundColor: palette.secondarySoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
