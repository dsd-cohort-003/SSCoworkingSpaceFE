export interface User {
  id: number;
  email: string;
  role: 'user' | 'admin' | null;
  username?: string;
  user_metadata?: Record<string, unknown>;
}
