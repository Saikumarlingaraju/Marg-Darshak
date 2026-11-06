import { QueryClient } from '@tanstack/react-query';
import { queryClient as defaultQueryClient } from '@/lib/api';
import { api } from '@/lib/api';

/**
 * Hook to access query client
 */
export function useQueryClient(): QueryClient {
  // This will be implemented with React Context if needed
  return defaultQueryClient;
}

/**
 * Prefetch critical dashboard data
 */
export async function prefetchDashboardData(queryClient: QueryClient) {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['kpis'],
      queryFn: () => api.getKPIs(),
      staleTime: 30000,
    }),
    queryClient.prefetchQuery({
      queryKey: ['charts', 'detection-trends'],
      queryFn: () => api.getDetectionTrends(),
      staleTime: 30000,
    }),
    queryClient.prefetchQuery({
      queryKey: ['charts', 'issue-distribution'],
      queryFn: () => api.getIssueDistribution(),
      staleTime: 30000,
    }),
    queryClient.prefetchQuery({
      queryKey: ['map', 'infrastructure'],
      queryFn: () => api.getMapInfrastructure(),
      staleTime: 60000,
    }),
    queryClient.prefetchQuery({
      queryKey: ['map', 'urban-blocks'],
      queryFn: () => api.getUrbanBlocks(),
      staleTime: 60000,
    }),
    queryClient.prefetchQuery({
      queryKey: ['inspections', 'priority-queue'],
      queryFn: () => api.getPriorityQueue(),
      staleTime: 30000,
    }),
    queryClient.prefetchQuery({
      queryKey: ['detections', 'recent', 1, 10],
      queryFn: () => api.getRecentDetections({ page: 1, pageSize: 10 }),
      staleTime: 15000,
    }),
    queryClient.prefetchQuery({
      queryKey: ['alerts', 'active'],
      queryFn: () => api.getActiveAlerts(),
      staleTime: 15000,
    }),
  ]);
}