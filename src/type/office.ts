export interface Office {
  id: number;
  name: string;
  description: string;
  size: number;
  state: string;
  city: string;
  streetAddress: string;
  zipcode: string;
  price?: number;
}
