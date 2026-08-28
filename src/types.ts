export type City = 'Paris' | 'Berlin' | 'Tokyo' | 'Rome' | 'New York';
export type Budget = 'Éco' | 'Standard' | 'Premium';
export type Vibe = 'Chill' | 'Culture' | 'Aventure';
export type Theme = 'Culture' | 'Food' | 'Détente';

export interface ItineraryStep {
  id: string;
  day: number;
  time: string;
  title: string;
  description: string;
  theme: Theme;
  price: number;
}
