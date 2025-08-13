import { useQuery } from '@tanstack/react-query';
import { fetchLocations } from '@/services/officesApi';
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
