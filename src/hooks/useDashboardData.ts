import { useQuery } from '@tanstack/react-query';
import { api, queryKeys } from '@/lib/api';

export function useKPIs() {
  return useQuery({
    queryKey: queryKeys.kpis,
    queryFn: () => api.getKPIs(),
    select: (response) => response.data,
  });
}

export function useDetectionTrends() {
  return useQuery({
    queryKey: queryKeys.detectionTrends,
    queryFn: () => api.getDetectionTrends(),
    select: (response) => response.data,
  });
}

export function useIssueDistribution() {
  return useQuery({
    queryKey: queryKeys.issueDistribution,
    queryFn: () => api.getIssueDistribution(),
    select: (response) => response.data,
  });
}

export function useMapInfrastructure() {
  return useQuery({
    queryKey: queryKeys.mapInfrastructure,
    queryFn: () => api.getMapInfrastructure(),
    select: (response) => response.data,
  });
}

export function useUrbanBlocks() {
  return useQuery({
    queryKey: queryKeys.urbanBlocks,
    queryFn: () => api.getUrbanBlocks(),
    select: (response) => response.data,
  });
}

export function usePriorityQueue() {
  return useQuery({
    queryKey: queryKeys.priorityQueue,
    queryFn: () => api.getPriorityQueue(),
    select: (response) => response.data,
  });
}

export function useRecentDetections(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: queryKeys.recentDetections(page, pageSize),
    queryFn: () => api.getRecentDetections({ page, pageSize }),
    select: (response) => response.data,
  });
}

export function useCities() {
  return useQuery({
    queryKey: queryKeys.cities,
    queryFn: () => api.getCities(),
    select: (response) => response.data,
  });
}

export function useActiveAlerts() {
  return useQuery({
    queryKey: queryKeys.alerts,
    queryFn: () => api.getActiveAlerts(),
    select: (response) => response.data,
  });
}
