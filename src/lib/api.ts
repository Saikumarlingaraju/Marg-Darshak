import { QueryClient } from '@tanstack/react-query';
import { API_BASE_URL, USE_MOCK_DATA } from './constants';

/**
 * API Client Configuration
 * Handles both mock data and real API calls
 */

// Types
export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
    timestamp: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Create a fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json();
}

/**
 * API Client Methods
 */
export const apiClient = {
  // KPIs
  getKPIs: () => fetchApi<ApiResponse<KPICardData[]>>('/kpis/summary'),

  // Charts
  getDetectionTrends: () => fetchApi<ApiResponse<ChartDataPoint[]>>('/charts/detection-trends'),
  getIssueDistribution: () => fetchApi<ApiResponse<BarChartData[]>>('/charts/issue-distribution'),

  // Map
  getMapInfrastructure: () => fetchApi<ApiResponse<MapLayerData>>('/map/infrastructure'),
  getUrbanBlocks: () => fetchApi<ApiResponse<UrbanBlock[]>>('/map/urban-blocks'),

  // Inspections
  getPriorityQueue: () => fetchApi<ApiResponse<PriorityItem[]>>('/inspections/priority-queue'),

  // Detections
  getRecentDetections: (params?: { page?: number; pageSize?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return fetchApi<ApiResponse<PaginatedResponse<DetectionRecord>>>(`/detections/recent${query}`);
  },

  // Cities
  getCities: () => fetchApi<ApiResponse<City[]>>('/cities'),

  // Alerts
  getActiveAlerts: () => fetchApi<ApiResponse<Alert[]>>('/alerts/active'),
};

/**
 * Mock Data Imports (dynamic imports for code splitting)
 */
let mockData: {
  kpis: KPICardData[];
  detectionTrends: ChartDataPoint[];
  issueDistribution: BarChartData[];
  mapInfrastructure: MapLayerData;
  urbanBlocks: UrbanBlock[];
  priorityQueue: PriorityItem[];
  recentDetections: PaginatedResponse<DetectionRecord>;
  cities: City[];
  alerts: readonly Alert[];
} | null = null;

async function loadMockData() {
  if (mockData) return mockData;

  const [
    { MOCK_KPI_CARDS },
    { MOCK_DETECTION_TRENDS },
    { MOCK_ISSUE_DISTRIBUTION },
    { MOCK_MAP_INFRASTRUCTURE },
    { MOCK_URBAN_BLOCKS },
    { MOCK_PRIORITY_QUEUE },
    { MOCK_RECENT_DETECTIONS },
    { MOCK_CITIES },
    { MOCK_ALERTS },
  ] = await Promise.all([
    import('@/data/mock/kpis'),
    import('@/data/mock/charts'),
    import('@/data/mock/charts'),
    import('@/data/mock/map'),
    import('@/data/mock/map'),
    import('@/data/mock/infrastructure'),
    import('@/data/mock/infrastructure'),
    import('@/data/constants/navigation'),
    import('@/data/mock/infrastructure'), // MOCK_ALERTS is in infrastructure.ts
  ]);

  mockData = {
    kpis: MOCK_KPI_CARDS,
    detectionTrends: MOCK_DETECTION_TRENDS,
    issueDistribution: MOCK_ISSUE_DISTRIBUTION,
    mapInfrastructure: MOCK_MAP_INFRASTRUCTURE,
    urbanBlocks: MOCK_URBAN_BLOCKS,
    priorityQueue: MOCK_PRIORITY_QUEUE,
    recentDetections: MOCK_RECENT_DETECTIONS,
    cities: MOCK_CITIES,
    alerts: MOCK_ALERTS,
  };

  return mockData;
}

/**
 * Unified API that switches between mock and real data
 */
export const api = {
  async getKPIs() {
    if (USE_MOCK_DATA) {
      const data = await loadMockData();
      return { data: data.kpis, meta: { timestamp: new Date().toISOString() } };
    }
    return apiClient.getKPIs();
  },

  async getDetectionTrends() {
    if (USE_MOCK_DATA) {
      const data = await loadMockData();
      return { data: data.detectionTrends, meta: { timestamp: new Date().toISOString() } };
    }
    return apiClient.getDetectionTrends();
  },

  async getIssueDistribution() {
    if (USE_MOCK_DATA) {
      const data = await loadMockData();
      return { data: data.issueDistribution, meta: { timestamp: new Date().toISOString() } };
    }
    return apiClient.getIssueDistribution();
  },

  async getMapInfrastructure() {
    if (USE_MOCK_DATA) {
      const data = await loadMockData();
      return { data: data.mapInfrastructure, meta: { timestamp: new Date().toISOString() } };
    }
    return apiClient.getMapInfrastructure();
  },

  async getUrbanBlocks() {
    if (USE_MOCK_DATA) {
      const data = await loadMockData();
      return { data: data.urbanBlocks, meta: { timestamp: new Date().toISOString() } };
    }
    return apiClient.getUrbanBlocks();
  },

  async getPriorityQueue() {
    if (USE_MOCK_DATA) {
      const data = await loadMockData();
      return { data: data.priorityQueue, meta: { timestamp: new Date().toISOString() } };
    }
    return apiClient.getPriorityQueue();
  },

  async getRecentDetections(params?: { page?: number; pageSize?: number }) {
    if (USE_MOCK_DATA) {
      const data = await loadMockData();
      return { data: data.recentDetections, meta: { timestamp: new Date().toISOString() } };
    }
    return apiClient.getRecentDetections(params);
  },

  async getCities() {
    if (USE_MOCK_DATA) {
      const data = await loadMockData();
      return { data: data.cities, meta: { timestamp: new Date().toISOString() } };
    }
    return apiClient.getCities();
  },

  async getActiveAlerts() {
    if (USE_MOCK_DATA) {
      const data = await loadMockData();
      return { data: data.alerts, meta: { timestamp: new Date().toISOString() } };
    }
    return apiClient.getActiveAlerts();
  },
};

/**
 * Type definitions (duplicated from types/dashboard.ts for API independence)
 * These will be replaced by imports from @/types when types are created
 */
export interface KPICardData {
  id: string;
  label: string;
  value: string;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  color: 'primary' | 'error' | 'success';
}

export interface ChartDataPoint {
  day: string;
  value: number;
}

export interface BarChartData {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

export interface MapLayerData {
  layers: MapLayer[];
}

export interface MapLayer {
  id: string;
  type: string;
  geojson: any; // GeoJSON.FeatureCollection;
  style: Record<string, unknown>;
  visible: boolean;
}

export interface UrbanBlock {
  id: string;
  name: string;
  geometry: any; // GeoJSON.Polygon;
  fillColor: string;
  borderColor: string;
}

export interface PriorityItem {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  detectedAt: string;
  status: 'pending' | 'in_progress' | 'resolved';
}

export interface DetectionRecord {
  id: string;
  detectionType: string;
  title: string;
  location: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  detectedAt: string;
  imageKey?: string;
}

export interface City {
  id: string;
  name: string;
  centerLat: number;
  centerLng: number;
  zoomLevel: number;
  isActive: boolean;
}

export interface Alert {
  id: string;
  type: string;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  createdAt: string;
  read: boolean;
}

/**
 * TanStack Query Client Configuration
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 30 seconds
      gcTime: 300000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

/**
 * Query Keys for consistent caching
 */
export const queryKeys = {
  kpis: ['kpis'] as const,
  detectionTrends: ['charts', 'detection-trends'] as const,
  issueDistribution: ['charts', 'issue-distribution'] as const,
  mapInfrastructure: ['map', 'infrastructure'] as const,
  urbanBlocks: ['map', 'urban-blocks'] as const,
  priorityQueue: ['inspections', 'priority-queue'] as const,
  recentDetections: (page?: number, pageSize?: number) =>
    ['detections', 'recent', page, pageSize] as const,
  cities: ['cities'] as const,
  alerts: ['alerts', 'active'] as const,
};