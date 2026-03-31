export type Appointment = {
  id: string;
  title: string;
  time: string;
  location: string;
  summary: string;
  status: 'Confirmed' | 'Reschedule' | 'Follow-up';
};

export const dashboardStats = [
  { label: 'Care plan completion', value: '84%' },
  { label: 'Upcoming visits', value: '3' },
  { label: 'Active reminders', value: '12' },
  { label: 'Immunizations on schedule', value: '92%' },
];

export const welcomeHighlights = [
  {
    title: 'Clinic reminders that stay human',
    body: 'ANC, PNC, vaccines, medicine, and missed-visit follow-up without cold hospital jargon.',
  },
  {
    title: 'Pregnancy and baby tracking in one flow',
    body: 'The app grows with the family instead of forcing them into disconnected tools.',
  },
  {
    title: 'Sponsor-ready impact storytelling',
    body: 'A clear dashboard and care journey help make the product legible to partners and funders.',
  },
];

export const quickActions = [
  'Log a new symptom',
  'Review next appointment',
  'Update baby growth entry',
  'Open mother profile',
];

export const appointments: Appointment[] = [
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
    title: 'Postnatal follow-up placeholder',
    time: 'Next week',
    location: 'Assigned after delivery',
    summary: 'Shows how continuity of care continues after birth for both mother and baby.',
    status: 'Follow-up',
  },
];

export const pregnancyChecklist = [
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
];

export const babyHighlights = [
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
];

export const babyVaccineSchedule = [
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
];

export const alertReminders = [
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
];

export const aiStarterPrompts = [
  'What foods should I eat this week of pregnancy?',
  'My baby missed a vaccine. What should I do next?',
  'When should I go to the clinic urgently?',
];

export const symptomLevels = [
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
];

export const sponsorSignals = [
  'Offline-friendly workflows for lower-connectivity clinics',
  'A stronger product story for health partners and donors',
  'Visible maternal and child outcomes across the care journey',
];

export const motherProfile = {
  name: 'Neema John',
  village: 'Mlandizi Ward',
  clinic: 'Kijiji Health Centre',
  language: 'Swahili + English',
  dueDate: 'July 18, 2026',
  supportContact: 'Asha - Sister and birth companion',
};
