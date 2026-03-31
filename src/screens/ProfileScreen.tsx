import React from 'react';

import { InfoCard } from '../components/InfoCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { useAppLanguage, type AppLanguage } from '../context/AppLanguageContext';
import { getLocalizedContent } from '../data/localizedContent';
import type { RootScreenProps } from '../types/navigation';

export function ProfileScreen({ navigation }: RootScreenProps<'Profile'>): React.JSX.Element {
  const { language, t } = useAppLanguage();
  const content = getLocalizedContent(language);
  const labels = profileLabels[language];

  return (
    <ScreenFrame>
      <SectionHeader title={t('profileTitle')} subtitle={t('profileSubtitle')} />
      <InfoCard
        eyebrow={labels.careProfile}
        title={content.motherProfile.name}
        body={[
          `${labels.village}: ${content.motherProfile.village}`,
          `${labels.clinic}: ${content.motherProfile.clinic}`,
          `${labels.language}: ${content.motherProfile.language}`,
          `${labels.dueDate}: ${content.motherProfile.dueDate}`,
          `${labels.supportContact}: ${content.motherProfile.supportContact}`,
        ].join('\n')}
      />
      <InfoCard
        eyebrow={labels.partnershipLens}
        title={labels.whyItMatters}
        body={content.sponsorSignals.join('\n')}
        tone="accent"
      />
      <PrimaryButton title={t('backToDashboard')} onPress={() => navigation.goBack()} />
    </ScreenFrame>
  );
}

const profileLabels: Record<
  AppLanguage,
  {
    careProfile: string;
    village: string;
    clinic: string;
    language: string;
    dueDate: string;
    supportContact: string;
    partnershipLens: string;
    whyItMatters: string;
  }
> = {
  English: {
    careProfile: 'Care profile',
    village: 'Village',
    clinic: 'Clinic',
    language: 'Language',
    dueDate: 'Due date',
    supportContact: 'Support contact',
    partnershipLens: 'Partnership lens',
    whyItMatters: 'Why this screen matters',
  },
  Kiswahili: {
    careProfile: 'Wasifu wa huduma',
    village: 'Kijiji',
    clinic: 'Kliniki',
    language: 'Lugha',
    dueDate: 'Tarehe ya kujifungua',
    supportContact: 'Mtu wa msaada',
    partnershipLens: 'Mtazamo wa ushirikiano',
    whyItMatters: 'Kwa nini skrini hii ni muhimu',
  },
  Kinyarwanda: {
    careProfile: 'Umwirondoro w’ubuvuzi',
    village: 'Umudugudu',
    clinic: 'Ivuriro',
    language: 'Ururimi',
    dueDate: 'Itariki yo kubyara',
    supportContact: 'Uwo kumuhamagara',
    partnershipLens: 'Inzira y’ubufatanye',
    whyItMatters: 'Impamvu iyi paji ari ingenzi',
  },
};
