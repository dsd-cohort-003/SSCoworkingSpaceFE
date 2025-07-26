// types/Billing.ts
// In particular, this is what is returned by the back end,
// not how it's stored in the database.
import type { OfficeReservation } from './officeReservation';
import type { User } from './user';

export interface Billing {
  id: number;
  reservation: OfficeReservation;
  user: User;
  total: number; // Total amount to be paid
  isPaid: boolean; // Payment status
}
