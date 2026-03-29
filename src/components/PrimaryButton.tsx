import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { palette, radii } from '../theme/tokens';

type ButtonVariant = 'solid' | 'soft' | 'outline';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: React.ReactNode;
};

export function PrimaryButton({
  title,
  onPress,
  variant = 'solid',
  fullWidth = true,
  icon,
}: PrimaryButtonProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
      ]}
    >
      {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
      <Text style={[styles.label, styles[`${variant}Label`]]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: radii.pill,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  fullWidth: {
    width: '100%',
  },
  solid: {
    backgroundColor: palette.secondary,
  },
  soft: {
    backgroundColor: palette.secondarySoft,
  },
  outline: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  solidLabel: {
    color: palette.white,
  },
  softLabel: {
    color: palette.secondary,
  },
  outlineLabel: {
    color: palette.text,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
