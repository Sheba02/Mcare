import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { palette, radii } from '../theme/tokens';

type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  caption?: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
};

export function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  caption,
  autoCapitalize = 'none',
}: InputFieldProps): React.JSX.Element {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={palette.textMuted}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        value={value}
      />
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.text,
  },
  input: {
    minHeight: 54,
    borderRadius: radii.md,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 16,
    fontSize: 15,
    color: palette.text,
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
    color: palette.textMuted,
  },
});
