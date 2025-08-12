import type { Desk } from './desk';
import type { Reservation } from './reservation';

export interface DeskReservation {
  id: number;
  desk: Desk;
  reservation?: Reservation; // Optional to avoid infinte deserialization
  startDate: string;
  endDate: string;
  status: string;
}
