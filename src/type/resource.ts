import type { Office } from './office';

export interface Resource {
  id: number;
  type: string;
  description: string;
  name: string;
  price: number;
  category: string;
  office: Office;
}

export interface CartItem extends Resource {
  quantity: number;
}
