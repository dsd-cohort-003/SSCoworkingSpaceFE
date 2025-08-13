const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export interface Resource {
  id: number;
  name: string;
  category: string;
  type: string;
  // ...other ResourceDTO fields
}
export function normalizeDate(date: string | Date) {
  return date instanceof Date
    ? date.toISOString()
    : new Date(date).toISOString();
}
export async function fetchResources(
  officeId: number,
  startDate: string,
  endDate: string,
) {
  try {
    const response = await fetch(`${BASE_URL}/api/resources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ officeId, startDate, endDate }),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch resources: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
