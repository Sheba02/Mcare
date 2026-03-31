import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  Notifications: undefined;
  SymptomChecker: undefined;
  Profile: undefined;
  VisitDetails: { visitId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Pregnancy: undefined;
  Baby: undefined;
  Appointments: undefined;
  AI: undefined;
};

export type RootScreenProps<RouteName extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  RouteName
>;
