import type { Desk } from './desk';
import type { Reservation } from './reservation';

export interface DeskReservation {
  id: number;
  desk: Desk;
  reservation: Reservation;
  startDate: string;
  endDate: string;
  status: string;
}
