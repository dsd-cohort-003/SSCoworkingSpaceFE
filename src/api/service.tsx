import type { Billing } from '../type/billing';

const BASE_URL = 'http://localhost:8080/api/billing';

export async function fetchAllBilling(): Promise<Billing[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch billing');
  return res.json();
}

export async function fetchBillingById(id: number): Promise<Billing> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch billing by ID');
  return res.json();
}

export async function fetchBillingByUser(userId: number): Promise<Billing[]> {
  const res = await fetch(`${BASE_URL}/user/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch billing by user');
  return res.json();
}

export async function fetchUnpaidBillingByUser(
  userId: number,
): Promise<Billing[]> {
  const res = await fetch(`${BASE_URL}/user/${userId}/unpaid`);
  if (!res.ok) throw new Error('Failed to fetch unpaid billing');
  return res.json();
}

export async function processPayment(billId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/pay/${billId}/process`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Payment processing failed');
}

export async function confirmPayment(billId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/pay/${billId}/confirm`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Confirming payment failed');
}

// Create new billing entry
export async function createBilling(
  reservationId: number,
  userId: number,
): Promise<Billing> {
  const res = await fetch(`${BASE_URL}/generate/{reservationId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reservationId, userId }),
  });
  if (!res.ok) throw new Error('Failed to create billing entry');
  return res.json();
}
