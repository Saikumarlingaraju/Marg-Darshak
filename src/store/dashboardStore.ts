import { create } from 'zustand';
import type {
  KPICardData,
  ChartDataPoint,
  BarChartData,
  MapLayer,
  UrbanBlock,
  PriorityItem,
  DetectionRecord,
  City,
  Alert,
} from '@/lib/api';

/**
 * Dashboard Data Store
 * Manages dashboard-specific data state (complements TanStack Query for server state)
 */

interface DashboardState {
  // KPIs
  kpis: KPICardData[];
  setKPIs: (kpis: KPICardData[]) => void;

  // Charts
  detectionTrends: ChartDataPoint[];
  setDetectionTrends: (data: ChartDataPoint[]) => void;
  issueDistribution: BarChartData[];
  setIssueDistribution: (data: BarChartData[]) => void;

  // Map
  mapLayers: MapLayer[];
  setMapLayers: (layers: MapLayer[]) => void;
  urbanBlocks: UrbanBlock[];
  setUrbanBlocks: (blocks: UrbanBlock[]) => void;
  selectedLayerIds: string[];
  toggleLayer: (layerId: string) => void;
  setSelectedLayerIds: (ids: string[]) => void;

  // Map Filters
  mapDateRange: string;
  setMapDateRange: (range: string) => void;
  mapSeverityFilter: string[];
  toggleMapSeverityFilter: (severity: string) => void;
  mapCategoryFilter: string[];
  toggleMapCategoryFilter: (category: string) => void;

  // Inspections
  priorityQueue: PriorityItem[];
  setPriorityQueue: (items: PriorityItem[]) => void;
  selectedInspectionId: string | null;
  setSelectedInspectionId: (id: string | null) => void;

  // Detections
  recentDetections: DetectionRecord[];
  setRecentDetections: (detections: DetectionRecord[]) => void;
  detectionsPage: number;
  setDetectionsPage: (page: number) => void;
  detectionsPageSize: number;
  setDetectionsPageSize: (size: number) => void;
  selectedDetectionIds: string[];
  toggleDetectionSelection: (id: string) => void;
  clearDetectionSelection: () => void;

  // Cities
  cities: City[];
  setCities: (cities: City[]) => void;

  // Alerts
  alerts: Alert[];
  setAlerts: (alerts: Alert[]) => void;
  markAlertRead: (id: string) => void;
  markAllAlertsRead: () => void;

  // Loading/Error states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  // KPIs
  kpis: [],
  setKPIs: (kpis) => set({ kpis }),

  // Charts
  detectionTrends: [],
  setDetectionTrends: (detectionTrends) => set({ detectionTrends }),
  issueDistribution: [],
  setIssueDistribution: (issueDistribution) => set({ issueDistribution }),

  // Map
  mapLayers: [],
  setMapLayers: (mapLayers) => set({ mapLayers }),
  urbanBlocks: [],
  setUrbanBlocks: (urbanBlocks) => set({ urbanBlocks }),
  selectedLayerIds: ['urban-blocks', 'arterial-roads'],
  toggleLayer: (layerId) =>
    set((state) => ({
      selectedLayerIds: state.selectedLayerIds.includes(layerId)
        ? state.selectedLayerIds.filter((id) => id !== layerId)
        : [...state.selectedLayerIds, layerId],
    })),
  setSelectedLayerIds: (selectedLayerIds) => set({ selectedLayerIds }),

  // Map Filters
  mapDateRange: '7d',
  setMapDateRange: (mapDateRange) => set({ mapDateRange }),
  mapSeverityFilter: ['critical', 'high', 'medium', 'low'],
  toggleMapSeverityFilter: (severity) =>
    set((state) => ({
      mapSeverityFilter: state.mapSeverityFilter.includes(severity)
        ? state.mapSeverityFilter.filter((s) => s !== severity)
        : [...state.mapSeverityFilter, severity],
    })),
  mapCategoryFilter: [],
  toggleMapCategoryFilter: (category) =>
    set((state) => ({
      mapCategoryFilter: state.mapCategoryFilter.includes(category)
        ? state.mapCategoryFilter.filter((c) => c !== category)
        : [...state.mapCategoryFilter, category],
    })),

  // Inspections
  priorityQueue: [],
  setPriorityQueue: (priorityQueue) => set({ priorityQueue }),
  selectedInspectionId: null,
  setSelectedInspectionId: (selectedInspectionId) => set({ selectedInspectionId }),

  // Detections
  recentDetections: [],
  setRecentDetections: (recentDetections) => set({ recentDetections }),
  detectionsPage: 1,
  setDetectionsPage: (detectionsPage) => set({ detectionsPage }),
  detectionsPageSize: 10,
  setDetectionsPageSize: (detectionsPageSize) => set({ detectionsPageSize }),
  selectedDetectionIds: [],
  toggleDetectionSelection: (id) =>
    set((state) => ({
      selectedDetectionIds: state.selectedDetectionIds.includes(id)
        ? state.selectedDetectionIds.filter((d) => d !== id)
        : [...state.selectedDetectionIds, id],
    })),
  clearDetectionSelection: () => set({ selectedDetectionIds: [] }),

  // Cities
  cities: [],
  setCities: (cities) => set({ cities }),

  // Alerts
  alerts: [],
  setAlerts: (alerts) => set({ alerts }),
  markAlertRead: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === id ? { ...a, read: true } : a)),
    })),
  markAllAlertsRead: () =>
    set((state) => ({
      alerts: state.alerts.map((a) => ({ ...a, read: true })),
    })),

  // Loading/Error
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  error: null,
  setError: (error) => set({ error }),
}));