import { useQuery } from '@tanstack/react-query';

export interface LocationData {
  id: number;
  name: string;
  description: string;
  price?: number;
  size: number;
  state: string;
  city: string;
  streetAddress: string;
  zipCode: string;
}
interface RawLocationData {
  id: number;
  name: string;
  description: string;
  price?: number;
  size: string;
  state: string;
  city: string;
  street_address: string;
  zipcode: string;
}
const fetchLocations = async (): Promise<LocationData[]> => {
  const response = await fetch('http://localhost:8080/offices');
  if (!response.ok) throw new Error('Network response was not ok');
  const data: RawLocationData[] = await response.json();
  const normalizedData: LocationData[] = data.map((office) => ({
    id: office.id,
    name: office.name,
    description: office.description,
    size: Number(office.size),
    state: office.state,
    city: office.city,
    streetAddress: office.street_address,
    zipCode: office.zipcode,
  }));

  return normalizedData;
};

export const useLocationQuery = () => {
  const query = useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  return {
    ...query,
    locations: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
