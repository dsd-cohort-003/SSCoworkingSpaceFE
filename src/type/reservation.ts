import type { User } from './user';

export interface Reservation {
  id: number;
  user: User;
  totalPrice: number;
  createdAt: string;
  confirmationNumber: string;
  status: string;
}
