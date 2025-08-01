import type { Reservation } from './reservation';
import type { Resource } from './resource';

export interface ResourceReservation {
  id: number;
  resource: Resource;
  reservation: Reservation;
  startDate: string;
  endDate: string;
  status: string;
}
