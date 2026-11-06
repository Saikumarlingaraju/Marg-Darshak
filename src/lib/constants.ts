/**
 * Application Constants
 * Centralized configuration values
 */

export const APP_NAME = 'Marg-Darshak Dashboard';
export const APP_VERSION = '1.0.0';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const DEFAULT_CITY = 'Bengaluru';
export const CITIES = [
  { id: 'bengaluru', name: 'Bengaluru', center: [12.9716, 77.5946], zoom: 12 },
  { id: 'mumbai', name: 'Mumbai', center: [19.0760, 72.8777], zoom: 12 },
  { id: 'delhi', name: 'Delhi', center: [28.7041, 77.1025], zoom: 12 },
] as const;

export const SEVERITY_LEVELS = [
  'critical',
  'high',
  'medium',
  'low',
] as const;

export const DETECTION_TYPES = [
  'pothole',
  'streetlight',
  'drainage',
  'sidewalk',
  'traffic-sign',
  'road-marking',
  'bridge',
  'other',
] as const;

export const STATUS_TYPES = [
  'pending',
  'in_progress',
  'resolved',
  'dismissed',
] as const;

export const DATE_RANGE_OPTIONS = [
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
] as const;

export const MAP_LAYERS = [
  { id: 'urban-blocks', name: 'Urban Blocks', visible: true },
  { id: 'arterial-roads', name: 'Arterial Roads', visible: true },
  { id: 'road-surfaces', name: 'Road Surfaces', visible: false },
  { id: 'fleet-routes', name: 'Fleet Routes', visible: false },
] as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

export const REFRESH_INTERVALS = {
  DASHBOARD: 30000, // 30 seconds
  ALERTS: 15000, // 15 seconds
  MAP: 60000, // 1 minute
} as const;

export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  'dashboard-sm': 1100,
  'dashboard-lg': 1440,
} as const;