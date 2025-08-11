import type { Reservation, ReservationDTO } from '@/type/reservation';

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
