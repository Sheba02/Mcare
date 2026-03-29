export const appTabs = [
  { id: 'home', label: 'Home' },
  { id: 'tracker', label: 'Tracker' },
  { id: 'care', label: 'Care' },
  { id: 'learn', label: 'Learn' },
];

export const keyMetrics = [
  { value: '8', label: 'Recommended ANC contacts to aim for' },
  { value: '3', label: 'Active reminders visible at a glance' },
  { value: '24', label: 'Pregnancy week shown with stage guidance' },
  { value: '1', label: 'Missed visit flagged for follow-up workflow' },
];

export const quickActions = [
  {
    title: 'Book checkup',
    body: 'Surface the next ANC, PNC, or child clinic appointment with one tap.',
  },
  {
    title: 'Log symptom',
    body: 'Capture how mom or baby feels before it becomes easy to forget.',
  },
  {
    title: 'Track vaccines',
    body: 'Keep immunization dates visible and easy to catch up.',
  },
  {
    title: 'Read danger signs',
    body: 'Turn health education into fast, understandable action.',
  },
];

export const reminders = [
  {
    title: 'ANC checkup',
    when: 'Tomorrow',
    body: 'Routine blood pressure, anemia screening, and nutrition review at Kijiji Health Centre.',
    tag: 'High priority visit',
  },
  {
    title: 'Tetanus booster',
    when: 'Friday',
    body: 'Medication and vaccine reminders stay friendly while still clear about timing.',
    tag: 'Medication support',
  },
  {
    title: 'Baby growth review',
    when: 'Next week',
    body: 'Follow-up cards make it easier for mothers and providers to avoid lost-to-care gaps.',
    tag: 'Continuity of care',
  },
];

export const pregnancyChecklist = [
  {
    title: 'Baby movement check',
    body: 'Use a simple kick counter after meals or in the evening when movement feels strongest.',
  },
  {
    title: 'Nutrition and rest',
    body: 'Encourage iron-rich foods, fluids, light activity, and enough rest when fatigue is building.',
  },
  {
    title: 'Warning signs',
    body: 'Keep headaches, swelling, bleeding, fever, and severe pain highly visible in the interface.',
  },
];

export const babyCareItems = [
  {
    title: 'Vaccine schedule tracking',
    body: 'Present upcoming immunizations clearly and show catch-up support when a child falls behind.',
  },
  {
    title: 'Growth monitoring',
    body: 'Reserve space for weight, length, and head circumference with future WHO chart views.',
  },
  {
    title: 'Milestones and feeding',
    body: 'Blend developmental guidance with feeding, sleep, and age-appropriate care tips.',
  },
];

export const symptomGuidance = [
  {
    tone: 'normal',
    level: 'Normal',
    title: 'Likely expected changes',
    body: 'Guide the mother with reassurance, self-care ideas, and a reminder of what to keep observing.',
  },
  {
    tone: 'monitor',
    level: 'Monitor',
    title: 'Watch closely',
    body: 'Explain what should trigger the next action and prompt a follow-up check within a safe time window.',
  },
  {
    tone: 'urgent',
    level: 'Seek care now',
    title: 'Possible emergency',
    body: 'Use clear language for symptoms such as bleeding, severe headache, convulsions, or infant breathing trouble.',
  },
];

export const careFlow = [
  {
    title: 'Missed appointment detected',
    body: 'The system notices a no-show and records the mother or child as needing outreach.',
  },
  {
    title: 'Reminder escalation',
    body: 'Start with an SMS or push reminder before moving to a more direct outreach attempt.',
  },
  {
    title: 'Health worker follow-up',
    body: 'If needed, prompt a nurse call or community health worker visit to reconnect the family to care.',
  },
];

export const educationTopics = [
  {
    title: 'Healthy pregnancy',
    body: 'Short lessons on food, hydration, rest, clinic attendance, and preparing for delivery.',
  },
  {
    title: 'Danger signs',
    body: 'Simple explanations for symptoms that should never wait until the next routine visit.',
  },
  {
    title: 'Vaccines and growth',
    body: 'Help caregivers understand why timely immunization and weight checks matter.',
  },
  {
    title: 'Postpartum recovery',
    body: 'Support moms after birth with guidance on healing, feeding, mood, and newborn care.',
  },
];
