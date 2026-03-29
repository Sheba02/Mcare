import React from 'react';

import { InfoCard } from '../components/InfoCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { appointments } from '../data/appContent';
import type { RootScreenProps } from '../types/navigation';

export function VisitDetailsScreen({
  navigation,
  route,
}: RootScreenProps<'VisitDetails'>): React.JSX.Element {
  const visit = appointments.find((item) => item.id === route.params.visitId) ?? appointments[0];

  return (
    <ScreenFrame>
      <SectionHeader title="Visit details" subtitle="One focused screen for planning, context, and follow-up." />
      <InfoCard eyebrow={visit.status} title={visit.title} body={`${visit.time}\n${visit.location}\n\n${visit.summary}`} tone="teal" />
      <InfoCard
        title="Suggested actions"
        body="Confirm transport, prepare clinic book, and keep emergency contacts available if symptoms change before the visit."
        tone="neutral"
      />
      <PrimaryButton title="Back to appointments" onPress={() => navigation.goBack()} />
    </ScreenFrame>
  );
}
