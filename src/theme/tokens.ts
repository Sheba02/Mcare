export const palette = {
  background: '#F6EFE5',
  surface: '#FFFCF7',
  surfaceMuted: '#FCE7F3',
  brand500: '#EC4899',
  brand600: '#DB2777',
  brand700: '#BE185D',
  brandSoft: '#FCE7F3',
  primary: '#EC4899',
  primaryDeep: '#BE185D',
  secondary: '#DB2777',
  secondarySoft: '#FCE7F3',
  accent: '#E8A33A',
  accentSoft: '#FFF2D8',
  success: '#2E6E58',
  warning: '#B9740F',
  danger: '#9A3128',
  text: '#162120',
  textMuted: '#566666',
  border: '#F3D3E3',
  white: '#FFFFFF',
} as const;

export const gradients = {
  page: ['#FCF8F3', '#F3EDE6'] as const,
  hero: ['#BE185D', '#DB2777'] as const,
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
