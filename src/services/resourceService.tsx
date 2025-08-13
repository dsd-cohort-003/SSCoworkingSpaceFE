import type { Resource } from '@/type/resource';

const BASE_URL = 'http://localhost:8080/api/resource';

export async function fetchAllResources(): Promise<Resource[]> {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) {
    throw new Error('Failed to fetch resources');
  }
  return res.json();
}
