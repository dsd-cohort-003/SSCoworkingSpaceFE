import type { LocationData } from './office';

export interface OfficeDesk {
  id: number;
  description: 'Large Desk' | 'Standing Desk' | 'Premium Desk' | 'Regular Desk';
  basePrice: number;
  office: LocationData;
}
