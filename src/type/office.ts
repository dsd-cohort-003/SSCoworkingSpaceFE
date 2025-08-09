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
  street_address: string;
  zipcode: string;
}
interface ReservationInfo {
  total: number | 0;
  officeTotal: number | 0;
  desksTotal: number | 0;
  startDate: Date | null;
  endDate: Date | null;
  resDesks: LocationData | [];
  resOffice: LocationData | null;
}
export interface officeReservationState {
  resInfo: ReservationInfo;
}
