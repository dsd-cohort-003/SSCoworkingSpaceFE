import type { Reservation } from '../type/reservation';

const BASE_URL = 'http://localhost:8080/api/reservation';

export async function fetchAllReservation(): Promise<Reservation[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch Reservation');
  return res.json();
}

export async function fetchReservationByUserId(
  id: number,
): Promise<Reservation[]> {
  const res = await fetch(`${BASE_URL}/user/${id}`);
  if (!res.ok) throw new Error('Failed to fetch Reservation by ID');
  return res.json();
}
