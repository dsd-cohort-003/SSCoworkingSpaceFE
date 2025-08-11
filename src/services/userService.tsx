import type { User } from '@/type/user';
import type { UUID } from 'crypto';

export async function fetchUserByAuthId(authId: UUID): Promise<User | null> {
  const res = await fetch(`http://localhost:8080/api/user/auth/${authId}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}
