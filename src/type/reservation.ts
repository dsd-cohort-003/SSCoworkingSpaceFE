import type { DeskReservation } from './deskReservation';
import type { ResourceReservation } from './resourceReservation';
import type { User } from './user';

export interface Reservation {
  id: number;
  user: User;
  totalPrice: number;
  createdAt: string;
  description: string;
  isPrivate: boolean;
  startDate: string;
  endDate: string;
  confirmationNumber: string;
  reservationStatus: string;
  deskReservation: DeskReservation;
  resourceReservation: ResourceReservation[];
}
