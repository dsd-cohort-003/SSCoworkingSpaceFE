import type { Desk } from './desk';
import type { Reservation } from './reservation';

export interface DeskReservation {
  id: number;
  desk: Desk;
  reservation?: Reservation; // Optional to avoid infinte deserialization
  startDate: Date;
  endDate: Date;
  status: string;
}

export interface DeskReservationDTO {
  id: number;
  startDate: Date;
  endDate: Date;
}
