export interface User {
  id: number;
  email: string;
  name?: string;
  username?: string;
  user_metadata?: Record<string, unknown>;
}
