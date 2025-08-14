import type { ResResource } from '@/type/resource';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function fetchAllResources(): Promise<ResResource[]> {
  const res = await fetch(`${BASE_URL}/api/resource`);
  if (!res.ok) {
    throw new Error('Failed to fetch resources');
  }
  const data = res.json();
  return data;
}
export async function fetchResourcesByOfficeId(
  officeId: number,
): Promise<ResResource[]> {
  const res = await fetch(`${BASE_URL}/api/resource/office/${officeId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch resources by office ID');
  }
  const data = await res.json();
  return data;
}
