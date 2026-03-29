import React from 'react';

import { InfoCard } from '../components/InfoCard';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { learningTracks, sponsorSignals } from '../data/appContent';

export function LearnScreen(): React.JSX.Element {
  return (
    <ScreenFrame>
      <SectionHeader
        title="Learning hub"
        subtitle="Short modules that strengthen maternal awareness without overwhelming the user."
      />
      {learningTracks.map((item, index) => (
        <InfoCard
          key={item.title}
          title={item.title}
          body={item.body}
          tone={index % 2 === 0 ? 'neutral' : 'peach'}
        />
      ))}
      <InfoCard
        eyebrow="Why this matters"
        title="A stronger case for partners and sponsors"
        body={sponsorSignals.join('\n')}
        tone="teal"
      />
    </ScreenFrame>
  );
}
