import React from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { gradients, palette } from '../theme/tokens';

type ScreenFrameProps = {
  children: React.ReactNode;
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function ScreenFrame({
  children,
  scroll = true,
  contentContainerStyle,
}: ScreenFrameProps): React.JSX.Element {
  return (
    <View style={styles.root}>
      <LinearGradient colors={gradients.page} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          {scroll ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
            >
              {children}
            </ScrollView>
          ) : (
            <View style={[styles.staticContent, contentContainerStyle]}>{children}</View>
          )}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.background,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 18,
  },
  staticContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 18,
  },
});
