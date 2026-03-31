import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AIScreen } from '../screens/AIScreen';
import { AppointmentsScreen } from '../screens/AppointmentsScreen';
import { BabyTrackerScreen } from '../screens/BabyTrackerScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { PregnancyTrackerScreen } from '../screens/PregnancyTrackerScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { SymptomCheckerScreen } from '../screens/SymptomCheckerScreen';
import { VisitDetailsScreen } from '../screens/VisitDetailsScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { useAppLanguage } from '../context/AppLanguageContext';
import { palette } from '../theme/tokens';
import type { MainTabParamList, RootStackParamList } from '../types/navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: palette.background,
    card: palette.surface,
    primary: palette.secondary,
    text: palette.text,
    border: palette.border,
  },
};

function getTabIcon(name: keyof MainTabParamList): keyof typeof MaterialCommunityIcons.glyphMap {
  switch (name) {
    case 'Home':
      return 'view-dashboard-outline';
    case 'Pregnancy':
      return 'heart-pulse';
    case 'Baby':
      return 'baby-face-outline';
    case 'Appointments':
      return 'calendar-clock-outline';
    case 'AI':
      return 'robot-outline';
    default:
      return 'circle-outline';
  }
}

function MainTabNavigator({
  onOpenNotifications,
  onOpenProfile,
  onOpenSymptomChecker,
  onOpenVisitDetails,
}: {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenSymptomChecker: () => void;
  onOpenVisitDetails: (visitId: string) => void;
}): React.JSX.Element {
  const { t } = useAppLanguage();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: palette.secondary,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 0,
          backgroundColor: palette.surface,
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name={getTabIcon(route.name)}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Tabs.Screen name="Home" options={{ tabBarLabel: t('homeTab') }}>
        {() => (
          <DashboardScreen
            onOpenNotifications={onOpenNotifications}
            onOpenProfile={onOpenProfile}
            onOpenSymptomChecker={onOpenSymptomChecker}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="Pregnancy"
        component={PregnancyTrackerScreen}
        options={{ tabBarLabel: t('pregnancyTab') }}
      />
      <Tabs.Screen
        name="Baby"
        component={BabyTrackerScreen}
        options={{ tabBarLabel: t('babyTab') }}
      />
      <Tabs.Screen name="Appointments" options={{ tabBarLabel: t('appointmentsTab') }}>
        {() => <AppointmentsScreen onOpenVisitDetails={onOpenVisitDetails} />}
      </Tabs.Screen>
      <Tabs.Screen name="AI" component={AIScreen} options={{ tabBarLabel: t('aiTab') }} />
    </Tabs.Navigator>
  );
}

export function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: palette.background } }}>
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="Welcome" component={WelcomeScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
        <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
        <RootStack.Screen name="MainTabs">
          {({ navigation }) => (
            <MainTabNavigator
              onOpenNotifications={() => navigation.navigate('Notifications')}
              onOpenProfile={() => navigation.navigate('Profile')}
              onOpenSymptomChecker={() => navigation.navigate('SymptomChecker')}
              onOpenVisitDetails={(visitId) => navigation.navigate('VisitDetails', { visitId })}
            />
          )}
        </RootStack.Screen>
        <RootStack.Screen name="Notifications" component={NotificationsScreen} />
        <RootStack.Screen name="SymptomChecker" component={SymptomCheckerScreen} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
        <RootStack.Screen name="VisitDetails" component={VisitDetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
