import type {
  MaintenanceTicket,
  MaintenanceTicketDTO,
} from '../type/maintenanceTicket';

const BASE_URL = 'http://localhost:8080/api/maintenance';

// Admin only - views all tickets that need covering
export async function fetchAllTickets(): Promise<MaintenanceTicket[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch maintenance tickets');
  return res.json();
}

export async function fetchTicketById(id: number): Promise<MaintenanceTicket> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch ticket by ID');
  return res.json();
}

export async function fetchTicketsByUser(
  userId: string,
): Promise<MaintenanceTicket[]> {
  const res = await fetch(`${BASE_URL}/user/auth/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch tickets by user');
  return res.json();
}

// If ticket's "status" field is not marked as "resolved"
export async function fetchUnresolvedTicketsByUser(
  userId: string,
): Promise<MaintenanceTicket[]> {
  const res = await fetch(`${BASE_URL}/user/auth/${userId}/unresolved`);
  if (!res.ok) throw new Error('Failed to fetch unresolved tickets');
  return res.json();
}

// Create new maintenance ticket (User only)
export async function createTicket(
  ticketDTO: MaintenanceTicketDTO,
): Promise<MaintenanceTicket> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticketDTO),
  });
  if (!res.ok) throw new Error('Failed to create maintenance ticket');
  return res.json();
}

// User can update their ticket but only limited fields
export async function updateTicket(
  id: number,
  ticketDTO: Partial<MaintenanceTicketDTO>,
): Promise<MaintenanceTicket> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticketDTO),
  });
  if (!res.ok) throw new Error('Failed to update ticket');
  return res.json();
}

// Admin only - can mark as resolved, add assigness, and others
export async function updateTicketAdmin(
  ticket: MaintenanceTicket,
): Promise<MaintenanceTicket> {
  const res = await fetch(`${BASE_URL}/admin/${ticket.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket),
  });
  if (!res.ok) throw new Error('Failed to update maintenance ticket');
  return res.json();
}

// Implied only the admin or user owning the ticket
export async function deleteTicket(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete maintenance ticket');
}
