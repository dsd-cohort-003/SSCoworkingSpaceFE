import type { Office } from './office';

export interface Desk {
  id: number;
  description: string;
  basePrice: number;
  office: Office;
}
