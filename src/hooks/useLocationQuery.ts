import { useQuery } from '@tanstack/react-query';
import type { RawLocationData, LocationData } from '@/type/office';

const fetchLocations = async (): Promise<LocationData[]> => {
  const response = await fetch('http://localhost:8080/offices');
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
