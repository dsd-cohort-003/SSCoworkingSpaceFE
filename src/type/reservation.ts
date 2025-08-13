import type { DeskReservation, DeskReservationDTO } from './deskReservation';
import type {
  ResourceReservation,
  ResourceReservationDTO,
} from './resourceReservation';
import type { User } from './user';

export interface Reservation {
  id: number;
  user: User;
  totalPrice: number;
  createdAt: Date;
  confirmationNumber: string;
  reservationStatus: string;
  isPrivate?: boolean;
  deskReservation: DeskReservation;
  resourceReservations: ResourceReservation[];
}

export interface ReservationDTO {
  // userId: number;
  authUserId: string; // This is the auth ID, not the internal user ID
  totalPrice: number;
  deskReservation: DeskReservationDTO;
  resourceReservations: ResourceReservationDTO[];
  isPrivate?: boolean;
  description: string;
}

export interface ReservationResponseDTO {
  id: number;
  user: User;
  totalPrice: number;
  createdAt: Date;
  confirmationNumber: number;
  description: string;
  reservationStatus: string;
  startDate: Date;
  endDate: Date;
  private: boolean;
}
