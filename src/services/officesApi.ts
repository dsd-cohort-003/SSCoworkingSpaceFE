import type { RawLocationData, LocationData } from '@/type/office';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchLocations = async (): Promise<LocationData[]> => {
  const response = await fetch(`${BASE_URL}/offices`);
  if (!response.ok) throw new Error('Network response was not ok');
  const data: RawLocationData[] = await response.json();
  const normalizedData: LocationData[] = data.map((office) => ({
    id: office.id,
    name: office.name,
    description: office.description,
    price: office.price,
    size: Number(office.size),
    state: office.state,
    city: office.city,
    streetAddress: office.streetAddress,
    zipCode: office.zipcode,
  }));
  return normalizedData;
};
