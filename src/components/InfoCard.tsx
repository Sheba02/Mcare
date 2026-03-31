import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { palette, radii } from '../theme/tokens';

type InfoCardTone = 'neutral' | 'teal' | 'peach' | 'accent';

type InfoCardProps = {
  eyebrow?: string;
  title: string;
  body: string;
  tone?: InfoCardTone;
  footer?: React.ReactNode;
};

export function InfoCard({
  eyebrow,
  title,
  body,
  tone = 'neutral',
  footer,
}: InfoCardProps): React.JSX.Element {
  return (
    <View style={[styles.card, styles[tone]]}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    padding: 18,
    borderWidth: 1,
    gap: 8,
  },
  neutral: {
    backgroundColor: palette.white,
    borderColor: palette.border,
  },
  teal: {
    backgroundColor: palette.secondarySoft,
    borderColor: '#B6D7CF',
  },
  peach: {
    backgroundColor: palette.surfaceMuted,
    borderColor: '#EDC7A8',
  },
  accent: {
    backgroundColor: palette.accentSoft,
    borderColor: '#F0D59B',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: palette.primaryDeep,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.textMuted,
  },
  footer: {
    marginTop: 8,
  },
});
