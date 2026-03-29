import React from 'react';

import { InfoCard } from '../components/InfoCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { motherProfile, sponsorSignals } from '../data/appContent';
import type { RootScreenProps } from '../types/navigation';

export function ProfileScreen({ navigation }: RootScreenProps<'Profile'>): React.JSX.Element {
  return (
    <ScreenFrame>
      <SectionHeader
        title="Mother profile"
        subtitle="A clean profile view for identity, clinic context, and support network."
      />
      <InfoCard
        eyebrow="Care profile"
        title={motherProfile.name}
        body={[
          `Village: ${motherProfile.village}`,
          `Clinic: ${motherProfile.clinic}`,
          `Language: ${motherProfile.language}`,
          `Due date: ${motherProfile.dueDate}`,
          `Support contact: ${motherProfile.supportContact}`,
        ].join('\n')}
      />
      <InfoCard
        eyebrow="Partnership lens"
        title="Why this screen matters"
        body={sponsorSignals.join('\n')}
        tone="accent"
      />
      <PrimaryButton title="Back to dashboard" onPress={() => navigation.goBack()} />
    </ScreenFrame>
  );
}
