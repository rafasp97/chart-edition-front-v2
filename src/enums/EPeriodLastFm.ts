export const LastFmPeriod = {
  SevenDays: '7day',
  OneMonth: '1month',
  ThreeMonths: '3month',
  SixMonths: '6month',
  TwelveMonths: '12month',
  Overall: 'overall',
} as const;

export type LastFmPeriod = (typeof LastFmPeriod)[keyof typeof LastFmPeriod];


export const LastFmPeriodTransaled = {
  '7day': '7 dias',
  '1month': '1 mês',
  '3month': '3 meses',
  '6month': '6 meses',
  '12month': '12 meses',
  'overall': 'Geral',
};