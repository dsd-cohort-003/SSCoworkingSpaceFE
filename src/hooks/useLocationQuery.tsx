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
const fetchLocations = async (): Promise<LocationData[]> => {
  const response = await fetch('/offices');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
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
