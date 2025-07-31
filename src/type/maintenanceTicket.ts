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
