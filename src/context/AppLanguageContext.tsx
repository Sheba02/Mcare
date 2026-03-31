import React, { createContext, useContext, useMemo, useState } from 'react';

export type AppLanguage = 'English' | 'Kiswahili' | 'Kinyarwanda';

type TranslationKey =
  | 'appName'
  | 'welcome'
  | 'welcomeBody'
  | 'signIn'
  | 'createAccount'
  | 'register'
  | 'registerBody'
  | 'fullName'
  | 'phoneNumber'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'preferredLanguage'
  | 'preferredLanguageBody'
  | 'alreadyHaveAccount'
  | 'welcomeBack'
  | 'loginBody'
  | 'forgotPassword'
  | 'recoverAccess'
  | 'recoverBody'
  | 'sendRecovery'
  | 'backToSignIn'
  | 'homeTab'
  | 'pregnancyTab'
  | 'babyTab'
  | 'appointmentsTab'
  | 'aiTab'
  | 'notificationsTitle'
  | 'notificationsSubtitle'
  | 'homeGreeting'
  | 'homeTitle'
  | 'homeBody'
  | 'upcomingVisits'
  | 'upcomingVisitsSubtitle'
  | 'pregnancyTracker'
  | 'pregnancySubtitle'
  | 'babyTracker'
  | 'babySubtitle'
  | 'appointmentsTitle'
  | 'appointmentsSubtitle'
  | 'medicalVisitData'
  | 'medicalVisitBody'
  | 'missedVisitSummary'
  | 'aiTitle'
  | 'aiSubtitle'
  | 'askAI'
  | 'getAIAdvice'
  | 'profileTitle'
  | 'profileSubtitle'
  | 'backToDashboard'
  | 'symptomChecker'
  | 'symptomSubtitle'
  | 'close'
  | 'visitDetails'
  | 'visitDetailsSubtitle'
  | 'backToAppointments'
  | 'onboardingTitle'
  | 'onboardingSubtitle'
  | 'babyNickname'
  | 'preferredClinic'
  | 'profileType'
  | 'finishSetup'
  | 'splashSubtitle';

const translations: Record<AppLanguage, Record<TranslationKey, string>> = {
  English: {
    appName: 'MamaCare+',
    welcome: 'Welcome',
    welcomeBody: 'Sign in to continue or create an account to get started.',
    signIn: 'Sign in',
    createAccount: 'Create account',
    register: 'Register',
    registerBody: 'Enter the details needed to create your profile.',
    fullName: 'Full name',
    phoneNumber: 'Phone number',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    preferredLanguage: 'Preferred language',
    preferredLanguageBody: 'This selection becomes the app language used after account creation.',
    alreadyHaveAccount: 'Already have an account',
    welcomeBack: 'Welcome back',
    loginBody: 'Use your phone or email account to continue.',
    forgotPassword: 'Forgot password?',
    recoverAccess: 'Recover access',
    recoverBody: 'Enter your email to receive a reset link or recovery code.',
    sendRecovery: 'Send recovery instructions',
    backToSignIn: 'Back to sign in',
    homeTab: 'Home',
    pregnancyTab: 'Pregnancy',
    babyTab: 'Baby',
    appointmentsTab: 'Appointments',
    aiTab: 'AI',
    notificationsTitle: 'Notifications',
    notificationsSubtitle: 'One place for clinic reminders, medication prompts, vaccine alerts, and urgent care signals.',
    homeGreeting: 'Good morning, Neema',
    homeTitle: 'Your care journey is organized, visible, and calm.',
    homeBody: 'Today’s view keeps appointments, symptom support, and child health tracking in one sponsor-worthy dashboard.',
    upcomingVisits: 'Upcoming visits',
    upcomingVisitsSubtitle: 'A clinic-friendly timeline for reminders and follow-up.',
    pregnancyTracker: 'Pregnancy tracker',
    pregnancySubtitle: 'A structured weekly view for progress, symptoms, and preparation.',
    babyTracker: 'Baby tracker',
    babySubtitle: 'Immunizations, growth monitoring, feeding notes, and developmental milestones.',
    appointmentsTitle: 'Appointments',
    appointmentsSubtitle: 'The schedule view is ready for ANC, PNC, vaccines, and missed-visit follow-up.',
    medicalVisitData: 'Medical visit data',
    medicalVisitBody: 'Keep visit records visible so missed appointments are easier to notice and follow up quickly.',
    missedVisitSummary: 'Missed-visit support summary',
    aiTitle: 'AI advice',
    aiSubtitle: 'A place where the mother can ask for practical advice before or between clinic visits.',
    askAI: 'Ask MamaCare AI',
    getAIAdvice: 'Get AI advice',
    profileTitle: 'Mother profile',
    profileSubtitle: 'A clean profile view for identity, clinic context, and support network.',
    backToDashboard: 'Back to dashboard',
    symptomChecker: 'Symptom checker',
    symptomSubtitle: 'Structured triage with calm language and clear urgency signals.',
    close: 'Close',
    visitDetails: 'Visit details',
    visitDetailsSubtitle: 'One focused screen for planning, context, and follow-up.',
    backToAppointments: 'Back to appointments',
    onboardingTitle: 'Set up care preferences',
    onboardingSubtitle: 'A strong onboarding flow helps the product feel tailored from the first minute.',
    babyNickname: 'Baby nickname',
    preferredClinic: 'Preferred clinic',
    profileType: 'Profile type',
    finishSetup: 'Finish setup',
    splashSubtitle: 'Maternal and child health companion for every stage of care.',
  },
  Kiswahili: {
    appName: 'MamaCare+',
    welcome: 'Karibu',
    welcomeBody: 'Ingia kuendelea au fungua akaunti mpya kuanza.',
    signIn: 'Ingia',
    createAccount: 'Fungua akaunti',
    register: 'Jisajili',
    registerBody: 'Weka taarifa zinazohitajika kuunda wasifu wako.',
    fullName: 'Majina kamili',
    phoneNumber: 'Namba ya simu',
    email: 'Barua pepe',
    password: 'Nenosiri',
    confirmPassword: 'Thibitisha nenosiri',
    preferredLanguage: 'Lugha unayopendelea',
    preferredLanguageBody: 'Uteuzi huu ndio lugha ya app itakayotumika baada ya kuunda akaunti.',
    alreadyHaveAccount: 'Tayari una akaunti',
    welcomeBack: 'Karibu tena',
    loginBody: 'Tumia simu au barua pepe kuendelea.',
    forgotPassword: 'Umesahau nenosiri?',
    recoverAccess: 'Rudisha ufikiaji',
    recoverBody: 'Weka barua pepe yako ili upokee linki au nambari ya kurejesha akaunti.',
    sendRecovery: 'Tuma maelekezo ya kurejesha',
    backToSignIn: 'Rudi kuingia',
    homeTab: 'Nyumbani',
    pregnancyTab: 'Ujauzito',
    babyTab: 'Mtoto',
    appointmentsTab: 'Miadi',
    aiTab: 'AI',
    notificationsTitle: 'Arifa',
    notificationsSubtitle: 'Mahali pamoja pa vikumbusho vya kliniki, dawa, chanjo, na arifa za huduma ya haraka.',
    homeGreeting: 'Habari za asubuhi, Neema',
    homeTitle: 'Safari yako ya huduma imepangika na inaonekana vizuri.',
    homeBody: 'Muonekano wa leo unaweka miadi, msaada wa dalili, na ufuatiliaji wa mtoto pamoja.',
    upcomingVisits: 'Ziara zijazo',
    upcomingVisitsSubtitle: 'Ratiba rahisi ya kliniki kwa vikumbusho na ufuatiliaji.',
    pregnancyTracker: 'Ufuatiliaji wa ujauzito',
    pregnancySubtitle: 'Mwonekano wa wiki kwa wiki kwa maendeleo, dalili, na maandalizi.',
    babyTracker: 'Ufuatiliaji wa mtoto',
    babySubtitle: 'Chanjo, ufuatiliaji wa ukuaji, kumbukumbu za lishe, na maendeleo ya mtoto.',
    appointmentsTitle: 'Miadi',
    appointmentsSubtitle: 'Mwonekano wa ratiba kwa ANC, PNC, chanjo, na ufuatiliaji wa miadi iliyokosekana.',
    medicalVisitData: 'Taarifa za ziara za hospitali',
    medicalVisitBody: 'Weka kumbukumbu za ziara wazi ili miadi iliyokosekana iwe rahisi kuonekana na kufuatiliwa.',
    missedVisitSummary: 'Muhtasari wa ufuatiliaji wa miadi iliyokosekana',
    aiTitle: 'Ushauri wa AI',
    aiSubtitle: 'Mahali ambapo mama anaweza kuuliza ushauri wa vitendo kabla au kati ya ziara za kliniki.',
    askAI: 'Muulize MamaCare AI',
    getAIAdvice: 'Pata ushauri wa AI',
    profileTitle: 'Wasifu wa mama',
    profileSubtitle: 'Mwonekano safi wa utambulisho, taarifa za kliniki, na mtandao wa msaada.',
    backToDashboard: 'Rudi nyumbani',
    symptomChecker: 'Kichunguzi cha dalili',
    symptomSubtitle: 'Mpangilio wa dalili wenye mwongozo wa utulivu na viwango vya haraka.',
    close: 'Funga',
    visitDetails: 'Maelezo ya ziara',
    visitDetailsSubtitle: 'Mwonekano mmoja wa kupanga, muktadha, na ufuatiliaji.',
    backToAppointments: 'Rudi kwenye miadi',
    onboardingTitle: 'Weka mapendeleo ya huduma',
    onboardingSubtitle: 'Uanzishaji mzuri husaidia bidhaa kuhisi imebinafsishwa tangu mwanzo.',
    babyNickname: 'Jina la utani la mtoto',
    preferredClinic: 'Kliniki unayopendelea',
    profileType: 'Aina ya wasifu',
    finishSetup: 'Maliza usanidi',
    splashSubtitle: 'Msaidizi wa afya ya mama na mtoto kwa kila hatua ya huduma.',
  },
  Kinyarwanda: {
    appName: 'MamaCare+',
    welcome: 'Murakaza neza',
    welcomeBody: 'Injira ukomeze cyangwa ufungure konti utangire.',
    signIn: 'Injira',
    createAccount: 'Fungura konti',
    register: 'Iyandikishe',
    registerBody: 'Andika amakuru akenewe kugira ngo ufungure umwirondoro wawe.',
    fullName: 'Amazina yuzuye',
    phoneNumber: 'Nimero ya telefoni',
    email: 'Imeyili',
    password: 'Ijambobanga',
    confirmPassword: 'Emeza ijambobanga',
    preferredLanguage: 'Ururimi ukunda',
    preferredLanguageBody: 'Uru rurimi ni rwo porogaramu izakoresha nyuma yo gukora konti.',
    alreadyHaveAccount: 'Usanzwe ufite konti',
    welcomeBack: 'Ongera ikaze',
    loginBody: 'Koresha telefoni cyangwa imeyili yawe kugirango ukomeze.',
    forgotPassword: 'Wibagiwe ijambobanga?',
    recoverAccess: 'Subiza uburenganzira',
    recoverBody: 'Andika imeyili yawe kugira ngo woherezwe uburyo bwo kongera kwinjira.',
    sendRecovery: 'Ohereza amabwiriza yo kongera kwinjira',
    backToSignIn: 'Subira ku kwinjira',
    homeTab: 'Ahabanza',
    pregnancyTab: 'Ugutwita',
    babyTab: 'Umwana',
    appointmentsTab: 'Gahunda',
    aiTab: 'AI',
    notificationsTitle: 'Amenyesha',
    notificationsSubtitle: 'Aho usanga hamwe kwibutsa amavuriro, imiti, inkingo, n’ibimenyetso byihutirwa.',
    homeGreeting: 'Mwaramutse, Neema',
    homeTitle: 'Urugendo rwawe rw’ubuvuzi rurateguwe kandi rugaragara neza.',
    homeBody: 'Reba gahunda z’uyu munsi, ubufasha ku bimenyetso, n’ikorwa ry’ikorwa ry’umwana hamwe.',
    upcomingVisits: 'Gahunda zitegerejwe',
    upcomingVisitsSubtitle: 'Urutonde rworoshye rwa kliniki rwo kwibutsa no gukurikirana.',
    pregnancyTracker: 'Ikurikirana ry’ugutwita',
    pregnancySubtitle: 'Reba buri cyumweru uko ibintu bihagaze, ibimenyetso, n’imyiteguro.',
    babyTracker: 'Ikurikirana ry’umwana',
    babySubtitle: 'Inkingo, gukurikirana imikurire, ibiryo, n’iterambere ry’umwana.',
    appointmentsTitle: 'Gahunda',
    appointmentsSubtitle: 'Uko gahunda za ANC, PNC, inkingo, n’ikorwa ry’ababuze gahunda zigaragara.',
    medicalVisitData: 'Amakuru y’ingendo kwa muganga',
    medicalVisitBody: 'Bika amakuru y’ingendo agaragara kugira ngo gahunda zabuze zikurikiranwe neza.',
    missedVisitSummary: 'Incamake yo gukurikirana gahunda zabuze',
    aiTitle: 'Inama za AI',
    aiSubtitle: 'Aho umubyeyi ashobora kubaza inama zifasha mbere cyangwa hagati y’ingendo kwa muganga.',
    askAI: 'Baza MamaCare AI',
    getAIAdvice: 'Bona inama za AI',
    profileTitle: 'Umwirondoro wa mama',
    profileSubtitle: 'Reba neza amakuru y’umwirondoro, ivuriro, n’abamushyigikira.',
    backToDashboard: 'Subira ku ibanze',
    symptomChecker: 'Isuzuma ry’ibimenyetso',
    symptomSubtitle: 'Ubusobanuro bw’ibimenyetso bufite ibyiciro by’ubwihutirwe.',
    close: 'Funga',
    visitDetails: 'Ibisobanuro bya gahunda',
    visitDetailsSubtitle: 'Urupapuro rumwe rwo gutegura, kumva amakuru, no gukurikirana.',
    backToAppointments: 'Subira kuri gahunda',
    onboardingTitle: 'Tegura ibyo ukunda',
    onboardingSubtitle: 'Gutangira neza bituma porogaramu yumvikana nk’iyagenewe uwo muntu.',
    babyNickname: 'Izina ry’akazina k’umwana',
    preferredClinic: 'Ivuriro ukunda',
    profileType: 'Ubwoko bw’umwirondoro',
    finishSetup: 'Rangiza igenamiterere',
    splashSubtitle: 'Umufasha w’ubuzima bwa mama n’umwana muri buri cyiciro cy’ubuvuzi.',
  },
};

type AppLanguageContextValue = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  t: (key: TranslationKey) => string;
};

const AppLanguageContext = createContext<AppLanguageContextValue | undefined>(undefined);

export function AppLanguageProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [language, setLanguage] = useState<AppLanguage>('English');

  const value = useMemo<AppLanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => translations[language][key],
    }),
    [language]
  );

  return <AppLanguageContext.Provider value={value}>{children}</AppLanguageContext.Provider>;
}

export function useAppLanguage(): AppLanguageContextValue {
  const context = useContext(AppLanguageContext);

  if (!context) {
    throw new Error('useAppLanguage must be used inside AppLanguageProvider.');
  }

  return context;
}
