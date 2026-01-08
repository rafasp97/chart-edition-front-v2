export const LastFmPeriod = {
  SevenDays: 'SevenDays',
  OneMonth: 'OneMonth',
  ThreeMonths: 'ThreeMonths',
  SixMonths: 'SixMonths',
  TwelveMonths: 'TwelveMonths',
  Overall: 'Overall',
} as const;

export type LastFmPeriod = (typeof LastFmPeriod)[keyof typeof LastFmPeriod];


export const LastFmPeriodTransaled = {
  'SevenDays': '7 dias',
  'OneMonth': '1 mês',
  'ThreeMonths': '3 meses',
  'SixMonths': '6 meses',
  'TwelveMonths': '12 meses',
  'Overall': 'Geral',
};