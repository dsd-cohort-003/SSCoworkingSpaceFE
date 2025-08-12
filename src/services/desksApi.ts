import type { LocationData } from '../type/office';
export interface OfficeDesk {
  id: number;
  description: 'Large Desk' | 'Standing Desk' | 'Premium Desk' | 'Regular Desk';
  basePrice: number;
  office: LocationData;
}
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchDesks = async (officeId: number): Promise<OfficeDesk[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/desks/desks/office/${officeId}`);

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data: OfficeDesk[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching desks:', error);
    throw error;
  }
};
