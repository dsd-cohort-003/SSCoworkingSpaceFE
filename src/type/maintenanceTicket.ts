import type { User } from './user';

export interface MaintenanceTicket {
  id: number;
  title: string;
  user: User;
  status: string;
  category: string;
  location: string;
  description: string;
  assignees: string;
  image: string;
}

export interface MaintenanceTicketDTO {
  userId: number; // This is the user ID of the person submitting the ticket
  title: string;
  // userId: number;
  status: string; // 'open' | 'in_progress' | 'closed'
  // On initial creation, status is sent as 'open'
  category: string;
  location: string;
  description: string;
  // Assignees is not initially set by the user, but by the admin on updating
  assignees?: string;
  image: string;
}
