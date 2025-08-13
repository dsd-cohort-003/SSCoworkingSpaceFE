export interface Office {
  id: number;
  name: string;
  description: string;
  size: number;
  state: string;
  city: string;
  streetAddress: string;
  zipcode: string;
  price?: number;
}
export interface LocationData {
  id: number;
  name: string;
  description: string;
  price: number;
  size: number;
  state: string;
  city: string;
  streetAddress: string;
  zipCode: string;
}
export interface RawLocationData {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  state: string;
  city: string;
  streetAddress: string;
  zipcode: string;
}
export interface DeskData {
  id: number;
  description: string;
  basePrice: number;
  name: string;
}
interface ReservationInfo {
  total: number | 0;
  officeTotal: number | 0;
  desksTotal: number | 0;
  startDate: Date | null;
  endDate: Date | null;
  resDesks: DeskData[];
  resOffice: LocationData | null;
}
export interface officeReservationState {
  resInfo: ReservationInfo;
}
