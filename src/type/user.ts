export interface User {
  id: string;
  email: string;
  name?: string;
  username?: string;
  user_metadata?: Record<string, unknown>;
}
