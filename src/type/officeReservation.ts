import type { Office } from './office';
import type { User } from './user';

export interface OfficeReservation {
  id: number;
  user: User;
  office: Office;
  startDate: string; // ISO string
  endDate: string; // ISO string
  confirmed: boolean;
  checkIn?: boolean;
}
