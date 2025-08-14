const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useMutation } from '@tanstack/react-query';

const createReservation = async (reservationData) => {
  const res = await fetch(`${BASE_URL}/api/reservation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservationData),
  });

  if (!res.ok) {
    throw new Error('Failed to create reservation');
  }
  return res.json();
};

export const useCreateReservation = () => {
  return useMutation({
    mutationFn: createReservation,
  });
};
