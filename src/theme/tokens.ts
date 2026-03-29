export const palette = {
  background: '#F6EFE5',
  surface: '#FFFCF7',
  surfaceMuted: '#F7E7D7',
  primary: '#CB6542',
  primaryDeep: '#9F472D',
  secondary: '#1E5C60',
  secondarySoft: '#D9ECE7',
  accent: '#E8A33A',
  accentSoft: '#FFF2D8',
  success: '#2E6E58',
  warning: '#B9740F',
  danger: '#9A3128',
  text: '#162120',
  textMuted: '#566666',
  border: '#E8D8C7',
  white: '#FFFFFF',
} as const;

export const gradients = {
  page: ['#FFF8EF', '#F6EFE5'] as const,
  hero: ['#184F57', '#3A8577'] as const,
  sunrise: ['#F5C48D', '#E77E4F'] as const,
  glow: ['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.72)'] as const,
} as const;

export const radii = {
  sm: 14,
  md: 18,
  lg: 24,
  xl: 30,
  pill: 999,
} as const;

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const shadows = {
  card: {
    shadowColor: '#17302F',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 24,
    elevation: 4,
  },
} as const;
