import { useQuery } from '@tanstack/react-query';
import type { Resource } from '@/type/resource';
import { fetchResources, normalizeDate } from '@/services/resurcesApi';
export function useAvailableResources(
  officeId?: number,
  startDate?: Date | string,
  endDate?: Date | string,
) {
  return useQuery<Resource[], Error>({
    queryKey: ['availableResources', officeId, startDate, endDate],
    queryFn: () => {
      if (
        officeId === undefined ||
        startDate === undefined ||
        endDate === undefined
      ) {
        throw new Error('Missing parameters for fetchResources');
      }

      return fetchResources(
        officeId,
        normalizeDate(startDate),
        normalizeDate(endDate),
      );
    },
    enabled: Boolean(officeId && startDate && endDate),
    staleTime: 5 * 60 * 1000, // 5 minutes caching
  });
}
