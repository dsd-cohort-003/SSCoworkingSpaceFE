import { useQuery } from '@tanstack/react-query';
import { fetchAllResources } from '@/services/resourceService';
export const useResources = () => {
  const query = useQuery({
    queryKey: ['resources'],
    queryFn: fetchAllResources,
  });
  return {
    ...query,
    resources: query.data,
    isPending: query.isPending,
    isError: query.isError,
  };
};
