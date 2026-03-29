import React from 'react';

import { InfoCard } from '../components/InfoCard';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { babyHighlights } from '../data/appContent';

export function BabyTrackerScreen(): React.JSX.Element {
  return (
    <ScreenFrame>
      <SectionHeader
        title="Baby tracker"
        subtitle="Immunizations, growth monitoring, feeding notes, and developmental milestones."
      />
      {babyHighlights.map((item, index) => (
        <InfoCard
          key={item.title}
          title={item.title}
          body={item.body}
          tone={index === 0 ? 'accent' : index === 1 ? 'teal' : 'neutral'}
        />
      ))}
    </ScreenFrame>
  );
}
