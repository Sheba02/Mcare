import type { AppLanguage } from '../context/AppLanguageContext';

type LocalizedAppointment = {
  id: string;
  title: string;
  time: string;
  location: string;
  summary: string;
  status: string;
};

type LocalizedContent = {
  dashboardStats: Array<{ label: string; value: string }>;
  appointments: LocalizedAppointment[];
  pregnancyChecklist: Array<{ title: string; body: string }>;
  babyHighlights: Array<{ title: string; body: string }>;
  babyVaccineSchedule: Array<{ name: string; due: string }>;
  alertReminders: Array<{ title: string; body: string }>;
  aiStarterPrompts: string[];
  symptomLevels: Array<{ level: string; body: string }>;
  sponsorSignals: string[];
  motherProfile: {
    name: string;
    village: string;
    clinic: string;
    language: string;
    dueDate: string;
    supportContact: string;
  };
  onboardingProfiles: string[];
  guidanceTopics: string[];
  notificationMeta: {
    priority: string;
    today: string;
    reminder: string;
    urgent: string;
    reminderValue: string;
  };
};

const localizedContent: Record<AppLanguage, LocalizedContent> = {
  English: {
    dashboardStats: [
      { label: 'Care plan completion', value: '84%' },
      { label: 'Upcoming visits', value: '3' },
      { label: 'Active reminders', value: '12' },
      { label: 'Immunizations on schedule', value: '92%' },
    ],
    appointments: [
      {
        id: 'anc-08',
        title: 'ANC visit - Week 24',
        time: 'Tomorrow, 08:30 AM',
        location: 'Kijiji Health Centre',
        summary: 'Blood pressure, anemia screening, and birth-preparation review.',
        status: 'Confirmed',
      },
      {
        id: 'vac-01',
        title: 'Tetanus booster',
        time: 'Friday, 02:15 PM',
        location: 'Mobile outreach clinic',
        summary: 'Vaccination support with education on expected side effects and rest.',
        status: 'Confirmed',
      },
      {
        id: 'pnc-01',
        title: 'Postnatal follow-up',
        time: 'Next week',
        location: 'Assigned after delivery',
        summary: 'Shows how continuity of care continues after birth for both mother and baby.',
        status: 'Follow-up',
      },
    ],
    pregnancyChecklist: [
      {
        title: 'Daily wellness scan',
        body: 'Capture headaches, swelling, bleeding, fever, or severe pain in fast guided prompts.',
      },
      {
        title: 'Movement tracking',
        body: 'Kick-count moments stay lightweight so they can be used in real life, not just in demos.',
      },
      {
        title: 'Nutrition rhythm',
        body: 'Promote iron-rich meals, hydration, supplements, and rest without overwhelming the mother.',
      },
    ],
    babyHighlights: [
      {
        title: 'Immunization timeline',
        body: 'BCG, OPV, pentavalent doses, measles, and catch-up planning can sit in one clear view.',
      },
      {
        title: 'Growth and development',
        body: 'Weight, length, head circumference, milestone checks, and feeding notes are ready to expand.',
      },
      {
        title: 'Caregiver guidance',
        body: 'Short education on sleep, breastfeeding, newborn danger signs, and clinic return windows.',
      },
    ],
    babyVaccineSchedule: [
      { name: 'BCG', due: 'At birth' },
      { name: 'OPV 0', due: 'At birth' },
      { name: 'OPV 1', due: '6 weeks' },
      { name: 'Penta 1', due: '6 weeks' },
      { name: 'PCV 1', due: '6 weeks' },
      { name: 'Rotavirus 1', due: '6 weeks' },
      { name: 'OPV 2', due: '10 weeks' },
      { name: 'Penta 2', due: '10 weeks' },
      { name: 'PCV 2', due: '10 weeks' },
      { name: 'Rotavirus 2', due: '10 weeks' },
      { name: 'OPV 3', due: '14 weeks' },
      { name: 'Penta 3', due: '14 weeks' },
      { name: 'PCV 3', due: '14 weeks' },
      { name: 'Measles-Rubella 1', due: '9 months' },
    ],
    alertReminders: [
      {
        title: 'Next ANC visit reminder',
        body: 'ANC visit tomorrow at 08:30 AM. Bring the clinic card, previous notes, and transport plan.',
      },
      {
        title: 'Medication reminder',
        body: 'Iron and folic acid tablet due tonight after food. Mark it complete so the care team can see adherence.',
      },
      {
        title: 'Baby immunization follow-up',
        body: 'Penta 2 is coming up this week. If missed, the app should escalate and prompt catch-up support.',
      },
      {
        title: 'High-priority symptom alert',
        body: 'If bleeding, severe headache, fever, or breathing trouble is logged, raise an urgent care alert immediately.',
      },
    ],
    aiStarterPrompts: [
      'What foods should I eat this week of pregnancy?',
      'My baby missed a vaccine. What should I do next?',
      'When should I go to the clinic urgently?',
    ],
    symptomLevels: [
      {
        level: 'Normal',
        body: 'Expected discomforts get reassurance, practical care tips, and a note on what to keep watching.',
      },
      {
        level: 'Monitor',
        body: 'The mother gets watch-points, self-care steps, and a clear moment for re-check or clinic contact.',
      },
      {
        level: 'Seek care now',
        body: 'Bleeding, convulsions, severe headache, breathing trouble, or infant fever trigger urgent action.',
      },
    ],
    sponsorSignals: [
      'Offline-friendly workflows for lower-connectivity clinics',
      'A stronger product story for health partners and donors',
      'Visible maternal and child outcomes across the care journey',
    ],
    motherProfile: {
      name: 'Neema John',
      village: 'Mlandizi Ward',
      clinic: 'Kijiji Health Centre',
      language: 'English',
      dueDate: 'July 18, 2026',
      supportContact: 'Asha - Sister and birth companion',
    },
    onboardingProfiles: ['Pregnant mother', 'New mother', 'Caregiver'],
    guidanceTopics: ['Breastfeeding', 'Sleep routine', 'Danger signs', 'Clinic return plan'],
    notificationMeta: {
      priority: 'Priority',
      today: 'Today',
      reminder: 'Reminder',
      urgent: 'Urgent',
      reminderValue: 'Reminder system value',
    },
  },
  Kiswahili: {
    dashboardStats: [
      { label: 'Ukamilifu wa mpango wa huduma', value: '84%' },
      { label: 'Ziara zijazo', value: '3' },
      { label: 'Vikumbusho hai', value: '12' },
      { label: 'Chanjo ziko kwenye ratiba', value: '92%' },
    ],
    appointments: [
      {
        id: 'anc-08',
        title: 'Ziara ya ANC - Wiki ya 24',
        time: 'Kesho, 08:30 AM',
        location: 'Kituo cha Afya Kijiji',
        summary: 'Vipimo vya presha, uchunguzi wa upungufu wa damu, na maandalizi ya kujifungua.',
        status: 'Imethibitishwa',
      },
      {
        id: 'vac-01',
        title: 'Nyongeza ya chanjo ya pepopunda',
        time: 'Ijumaa, 02:15 PM',
        location: 'Kliniki tembezi',
        summary: 'Msaada wa chanjo pamoja na elimu ya madhara yanayoweza kutokea na mapumziko.',
        status: 'Imethibitishwa',
      },
      {
        id: 'pnc-01',
        title: 'Ufuatiliaji wa baada ya kujifungua',
        time: 'Wiki ijayo',
        location: 'Itawekwa baada ya kujifungua',
        summary: 'Inaonyesha jinsi mwendelezo wa huduma unavyoendelea kwa mama na mtoto baada ya kuzaliwa.',
        status: 'Ufuatiliaji',
      },
    ],
    pregnancyChecklist: [
      {
        title: 'Ukaguzi wa afya wa kila siku',
        body: 'Rekodi maumivu ya kichwa, uvimbe, kutokwa damu, homa, au maumivu makali kwa mwongozo mfupi.',
      },
      {
        title: 'Ufuatiliaji wa mtoto kucheza',
        body: 'Vipindi vya kuhesabu mateke vinabaki rahisi ili vitumike kwenye maisha halisi.',
      },
      {
        title: 'Mpangilio wa lishe',
        body: 'Hamasisha vyakula vyenye madini ya chuma, maji, virutubisho, na mapumziko bila kumlemea mama.',
      },
    ],
    babyHighlights: [
      {
        title: 'Ratiba ya chanjo',
        body: 'BCG, OPV, dozi za pentavalent, surua, na catch-up vinaweza kuonekana kwa pamoja.',
      },
      {
        title: 'Ukuaji na maendeleo',
        body: 'Uzito, urefu, mzunguko wa kichwa, milestones, na kumbukumbu za ulishaji ziko tayari kupanuka.',
      },
      {
        title: 'Mwongozo kwa mlezi',
        body: 'Elimu fupi juu ya usingizi, kunyonyesha, hatari za mtoto mchanga, na lini kurudi kliniki.',
      },
    ],
    babyVaccineSchedule: [
      { name: 'BCG', due: 'Wakati wa kuzaliwa' },
      { name: 'OPV 0', due: 'Wakati wa kuzaliwa' },
      { name: 'OPV 1', due: 'Wiki 6' },
      { name: 'Penta 1', due: 'Wiki 6' },
      { name: 'PCV 1', due: 'Wiki 6' },
      { name: 'Rotavirus 1', due: 'Wiki 6' },
      { name: 'OPV 2', due: 'Wiki 10' },
      { name: 'Penta 2', due: 'Wiki 10' },
      { name: 'PCV 2', due: 'Wiki 10' },
      { name: 'Rotavirus 2', due: 'Wiki 10' },
      { name: 'OPV 3', due: 'Wiki 14' },
      { name: 'Penta 3', due: 'Wiki 14' },
      { name: 'PCV 3', due: 'Wiki 14' },
      { name: 'Measles-Rubella 1', due: 'Miezi 9' },
    ],
    alertReminders: [
      {
        title: 'Kikumbusho cha ziara ijayo ya ANC',
        body: 'Ziara ya ANC ni kesho saa 08:30 AM. Leta kadi ya kliniki, kumbukumbu zilizopita, na mpango wa usafiri.',
      },
      {
        title: 'Kikumbusho cha dawa',
        body: 'Kidonge cha iron na folic acid kinahitajika usiku baada ya chakula. Kimalize ili timu ya afya ione ufuatiliaji.',
      },
      {
        title: 'Ufuatiliaji wa chanjo ya mtoto',
        body: 'Penta 2 inakaribia wiki hii. Ikikosekana, app inapaswa kuhamasisha catch-up haraka.',
      },
      {
        title: 'Tahadhari ya dalili muhimu',
        body: 'Ikiwa damu, maumivu makali ya kichwa, homa, au shida ya kupumua vimeandikwa, toa tahadhari ya haraka.',
      },
    ],
    aiStarterPrompts: [
      'Nile vyakula gani wiki hii ya ujauzito?',
      'Mtoto wangu amekosa chanjo. Nifanye nini sasa?',
      'Ni lini niende kliniki kwa haraka?',
    ],
    symptomLevels: [
      {
        level: 'Kawaida',
        body: 'Usumbufu unaotarajiwa hupata utulivu, ushauri wa vitendo, na maelekezo ya nini cha kuendelea kufuatilia.',
      },
      {
        level: 'Fuatilia',
        body: 'Mama anapata vitu vya kuangalia, hatua za kujitunza, na muda wa kurudia ukaguzi au kuwasiliana na kliniki.',
      },
      {
        level: 'Tafuta huduma sasa',
        body: 'Kutokwa damu, degedege, maumivu makali ya kichwa, shida ya kupumua, au homa ya mtoto huhitaji hatua ya haraka.',
      },
    ],
    sponsorSignals: [
      'Mtiririko unaofanya kazi hata kwenye maeneo yenye mtandao mdogo',
      'Hadithi bora ya bidhaa kwa washirika wa afya na wafadhili',
      'Matokeo ya afya ya mama na mtoto yanaonekana katika safari yote ya huduma',
    ],
    motherProfile: {
      name: 'Neema John',
      village: 'Kata ya Mlandizi',
      clinic: 'Kituo cha Afya Kijiji',
      language: 'Kiswahili',
      dueDate: 'Julai 18, 2026',
      supportContact: 'Asha - Dada na mwenza wa kujifungua',
    },
    onboardingProfiles: ['Mama mjamzito', 'Mama mpya', 'Mlezi'],
    guidanceTopics: ['Kunyonyesha', 'Ratiba ya usingizi', 'Dalili za hatari', 'Mpango wa kurudi kliniki'],
    notificationMeta: {
      priority: 'Kipaumbele',
      today: 'Leo',
      reminder: 'Kikumbusho',
      urgent: 'Haraka',
      reminderValue: 'Faida ya mfumo wa vikumbusho',
    },
  },
  Kinyarwanda: {
    dashboardStats: [
      { label: 'Isozwa ry’umugambi w’ubuvuzi', value: '84%' },
      { label: 'Gahunda zitegerejwe', value: '3' },
      { label: 'Ibyibutswa bikora', value: '12' },
      { label: 'Inkingo zubahiriza gahunda', value: '92%' },
    ],
    appointments: [
      {
        id: 'anc-08',
        title: 'Gahunda ya ANC - Icyumweru cya 24',
        time: 'Ejo, 08:30 AM',
        location: 'Ivuriro rya Kijiji',
        summary: 'Gupima umuvuduko w’amaraso, kureba ikibazo cy’amaraso make, no gutegura kubyara.',
        status: 'Byemejwe',
      },
      {
        id: 'vac-01',
        title: 'Urukingo rwa tetanusi',
        time: 'Ku wa Gatanu, 02:15 PM',
        location: 'Ivuriro rigendanwa',
        summary: 'Gufashwa ku rukingo hamwe n’ubusobanuro ku ngaruka zishoboka n’uruhuka.',
        status: 'Byemejwe',
      },
      {
        id: 'pnc-01',
        title: 'Gukurikirana nyuma yo kubyara',
        time: 'Icyumweru gitaha',
        location: 'Bizagenwa nyuma yo kubyara',
        summary: 'Byerekana uko ubuvuzi bukomeza nyuma yo kubyara kuri mama n’umwana.',
        status: 'Gukurikirana',
      },
    ],
    pregnancyChecklist: [
      {
        title: 'Isuzuma rya buri munsi',
        body: 'Bika umutwe, kubyimba, kuva amaraso, umuriro, cyangwa ububabare bukomeye mu buryo bwihuse.',
      },
      {
        title: 'Gukurikirana uko umwana akina',
        body: 'Kubara imigeri bikorwa mu buryo bworoshye kugira ngo bikoreshwe mu buzima busanzwe.',
      },
      {
        title: 'Imirire ikurikiranwa',
        body: 'Shishikariza ifunguro rifite ubutare, amazi, inyunganiramirire, n’uruhuka utaremereye mama.',
      },
    ],
    babyHighlights: [
      {
        title: 'Ingengabihe y’inkingo',
        body: 'BCG, OPV, doze za pentavalent, measles, na catch-up bishobora kugaragara hamwe.',
      },
      {
        title: 'Imikurire n’iterambere',
        body: 'Ibiro, uburebure, umuzenguruko w’umutwe, milestones, n’amakuru yo kugaburira birateguwe.',
      },
      {
        title: 'Inama ku murezi',
        body: 'Ubutumwa bugufi ku gusinzira, konsa, ibimenyetso by’akaga ku mwana, n’igihe cyo kugaruka kwa muganga.',
      },
    ],
    babyVaccineSchedule: [
      { name: 'BCG', due: 'Ku ivuka' },
      { name: 'OPV 0', due: 'Ku ivuka' },
      { name: 'OPV 1', due: 'Ibyumweru 6' },
      { name: 'Penta 1', due: 'Ibyumweru 6' },
      { name: 'PCV 1', due: 'Ibyumweru 6' },
      { name: 'Rotavirus 1', due: 'Ibyumweru 6' },
      { name: 'OPV 2', due: 'Ibyumweru 10' },
      { name: 'Penta 2', due: 'Ibyumweru 10' },
      { name: 'PCV 2', due: 'Ibyumweru 10' },
      { name: 'Rotavirus 2', due: 'Ibyumweru 10' },
      { name: 'OPV 3', due: 'Ibyumweru 14' },
      { name: 'Penta 3', due: 'Ibyumweru 14' },
      { name: 'PCV 3', due: 'Ibyumweru 14' },
      { name: 'Measles-Rubella 1', due: 'Amezi 9' },
    ],
    alertReminders: [
      {
        title: 'Kwibutsa gahunda ya ANC ikurikiraho',
        body: 'Gahunda ya ANC ni ejo saa 08:30 AM. Zana ikarita ya kliniki, inyandiko za mbere, n’umugambi w’ingendo.',
      },
      {
        title: 'Kwibutsa imiti',
        body: 'Ikinini cya iron na folic acid kigomba gufatwa iri joro nyuma yo kurya. Cyuzuze kugirango itsinda ribimenye.',
      },
      {
        title: 'Gukurikirana urukingo rw’umwana',
        body: 'Penta 2 iri hafi muri iki cyumweru. Niramuka ibuze, app igomba kwibutsa gukurikirana byihuse.',
      },
      {
        title: 'Integuza y’ibimenyetso bikomeye',
        body: 'Nihandikwa kuva amaraso, umutwe ukomeye, umuriro, cyangwa ikibazo cyo guhumeka, hagarare integuza yihuse.',
      },
    ],
    aiStarterPrompts: [
      'Ni ibihe biryo nkiri kurya muri iki cyumweru cy’ugutwita?',
      'Umwana wanjye yasibye urukingo. Nkore iki ubu?',
      'Ni ryari ngomba kujya kwa muganga byihuse?',
    ],
    symptomLevels: [
      {
        level: 'Bisanzwe',
        body: 'Ibimenyetso byitezwe bihabwa ihumure, inama zifatika, n’icyo gukomeza gukurikirana.',
      },
      {
        level: 'Kurikirana',
        body: 'Mama ahabwa ibyo kwitondera, uburyo bwo kwiyitaho, n’igihe cyo kongera kwisuzumisha cyangwa guhamagara ivuriro.',
      },
      {
        level: 'Shaka ubuvuzi nonaha',
        body: 'Kuva amaraso, kugagara, umutwe ukomeye, ikibazo cyo guhumeka, cyangwa umuriro ku mwana bisaba igikorwa cyihuse.',
      },
    ],
    sponsorSignals: [
      'Imikorere ikora neza no mu mavuriro afite internet nkeya',
      'Inkuru nziza y’ikorwa ku bafatanyabikorwa n’abaterankunga',
      'Ibisubizo by’ubuzima bwa mama n’umwana bigaragara mu rugendo rwose rw’ubuvuzi',
    ],
    motherProfile: {
      name: 'Neema John',
      village: 'Umurenge wa Mlandizi',
      clinic: 'Ivuriro rya Kijiji',
      language: 'Kinyarwanda',
      dueDate: '18 Nyakanga 2026',
      supportContact: 'Asha - Mushiki we n’umufasha wo kubyara',
    },
    onboardingProfiles: ['Mama utwite', 'Mama mushya', 'Umurezi'],
    guidanceTopics: ['Konsa', 'Gahunda yo gusinzira', 'Ibimenyetso by’akaga', 'Umugambi wo gusubira kwa muganga'],
    notificationMeta: {
      priority: 'Byihutirwa',
      today: 'Uyu munsi',
      reminder: 'Kwibutsa',
      urgent: 'Byihuse',
      reminderValue: 'Akamaro ka sisitemu yo kwibutsa',
    },
  },
};

export function getLocalizedContent(language: AppLanguage): LocalizedContent {
  return localizedContent[language];
}
