import type { Office } from './office';

export interface Resource {
  id: number;
  type: string;
  description: string;
  price: number;
  category: string;
  office: Office;
}
