import { useQuery } from '@tanstack/react-query';
import { fetchDesks } from '@/services/desksApi';

function useOfficesDesks(officeId: number) {
  const query = useQuery({
    queryKey: ['officesDesks', officeId],
    queryFn: () => fetchDesks(officeId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  return {
    ...query,
    desks: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export default useOfficesDesks;
