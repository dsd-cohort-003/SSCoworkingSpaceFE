import type {
  Reservation,
  ReservationDTO,
  ReservationResponseDTO,
} from '@/type/reservation';

const BASE_URL = 'http://localhost:8080/api/reservation';

export async function submitReservation(
  reservationDTO: ReservationDTO,
): Promise<Reservation> {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservationDTO),
  });
  if (!res.ok) throw new Error('Failed to submit reservation');
  return res.json();
}

export async function fetchAllReservation(): Promise<ReservationResponseDTO[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch Reservation');
  return res.json();
}

export async function fetchPublicReservation(): Promise<
  ReservationResponseDTO[]
> {
  const res = await fetch(`${BASE_URL}/public`);
  if (!res.ok) throw new Error('Failed to fetch Reservation');
  return res.json();
}

export async function fetchReservationByUserId(
  id: number,
): Promise<ReservationResponseDTO[]> {
  const res = await fetch(`${BASE_URL}/user/${id}`);
  if (!res.ok) throw new Error('Failed to fetch Reservation by ID');
  return res.json();
}

export async function fetchReservationsByAuthUserId(
  authId: string,
): Promise<ReservationResponseDTO[]> {
  const res = await fetch(`${BASE_URL}/user/auth/${authId}`);
  if (!res.ok) throw new Error('Failed to fetch Reservation by auth ID');
  return res.json();
}
