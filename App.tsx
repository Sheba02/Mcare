import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppLanguageProvider } from './src/context/AppLanguageContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AppLanguageProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </AppLanguageProvider>
    </SafeAreaProvider>
  );
}
