export interface User {
  id: number;
  username: string;
  email: string;
  role: string; // e.g., "user", "admin"
  createdAt: string; // ISO string
}
