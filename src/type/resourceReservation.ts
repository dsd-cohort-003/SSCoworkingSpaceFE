import type { Reservation } from './reservation';
import type { Resource } from './resource';

export interface ResourceReservation {
  id: number;
  resource: Resource;
  reservation?: Reservation; // Optional to avoid infinte deserialization
  startDate: Date;
  endDate: Date;
  status: string;
}

export interface ResourceReservationDTO {
  id: number;
  quantity: number;
  startDate: Date;
  endDate: Date;
}
