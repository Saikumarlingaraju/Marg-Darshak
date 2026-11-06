/**
 * Status constants and types for Marg-Darshak Dashboard
 * @packageDocumentation
 */

/**
 * Detection types for urban infrastructure issues
 * @mock
 */
export const MOCK_DETECTION_TYPES = [
  'pothole',
  'streetlight',
  'drainage',
  'footpath',
  'signage',
  'road-marking',
  'manhole',
  'vegetation',
] as const;

export type DetectionType = (typeof MOCK_DETECTION_TYPES)[number];

/**
 * Severity levels with exact Figma color mapping
 * @mock
 */
export const MOCK_SEVERITY_LEVELS = [
  'critical',
  'high',
  'medium',
  'low',
] as const;

export type SeverityLevel = (typeof MOCK_SEVERITY_LEVELS)[number];

/**
 * Exact Figma colors for severity levels
 * Colors match tailwind.config.ts error, warning, info, success scales
 * @mock
 */
export const MOCK_SEVERITY_COLORS: Record<SeverityLevel, string> = {
  critical: '#d94e50', // error.DEFAULT
  high: '#d68b17',     // warning.DEFAULT
  medium: '#246beb',   // info.DEFAULT
  low: '#16856b',      // success.DEFAULT
};

/**
 * Background colors for severity badges
 * @mock
 */
export const MOCK_SEVERITY_BG_COLORS: Record<SeverityLevel, string> = {
  critical: '#fdebec', // error.bg
  high: '#fff4dc',     // warning.bg
  medium: '#eaf0f2',   // info.bg
  low: '#e7f5ef',      // success.bg
};

/**
 * Text colors for severity labels
 * @mock
 */
export const MOCK_SEVERITY_TEXT_COLORS: Record<SeverityLevel, string> = {
  critical: '#d94e50', // error.text
  high: '#d68b17',     // warning.text
  medium: '#246beb',   // info.text
  low: '#16856b',      // success.text
};

/**
 * Border colors for severity badges
 * @mock
 */
export const MOCK_SEVERITY_BORDER_COLORS: Record<SeverityLevel, string> = {
  critical: '#fbd5d7',
  high: '#ffe8b3',
  medium: '#d6e4f0',
  low: '#cff0df',
};

/**
 * Dot colors for severity indicators
 * @mock
 */
export const MOCK_SEVERITY_DOT_COLORS: Record<SeverityLevel, string> = {
  critical: '#d94e50',
  high: '#d68b17',
  medium: '#246beb',
  low: '#16856b',
};

/**
 * Status types for inspection items
 * @mock
 */
export const MOCK_STATUS_TYPES = [
  'pending',
  'in_progress',
  'resolved',
] as const;

export type StatusType = (typeof MOCK_STATUS_TYPES)[number];

/**
 * Colors for status indicators
 * @mock
 */
export const MOCK_STATUS_COLORS: Record<StatusType, string> = {
  pending: '#d68b17',     // warning.DEFAULT
  in_progress: '#246beb', // info.DEFAULT
  resolved: '#16856b',    // success.DEFAULT
};

/**
 * Chart series colors - EXACT from Figma (tailwind.config.ts chart object)
 * @mock
 */
export const MOCK_CHART_COLORS = {
  series1: '#246beb',
  series2: '#4984d2',
  series3: '#659dba',
  series4: '#7eb2c2',
  series5: '#a1c4cd',
  area1: 'rgba(73, 132, 210, 0.15)',
  grid: '#dde5ed',
} as const;

/**
 * Neutral grays - EXACT from Figma
 * @mock
 */
export const MOCK_NEUTRAL_COLORS = {
  50: '#f3f6f9',
  100: '#eaf0f2',
  200: '#dde5ed',
  300: '#c8d4dd',
  400: '#94a5b6',
  500: '#82959f',
  600: '#67788b',
  700: '#4a5d6e',
  800: '#2d3e4f',
  900: '#17293d',
} as const;

/**
 * Primary brand colors - EXACT from Figma
 * @mock
 */
export const MOCK_PRIMARY_COLORS = {
  DEFAULT: '#17293d',
  dark: '#0f1c2e',
  light: '#1e3a5f',
} as const;

/**
 * Semantic colors - EXACT from Figma
 * @mock
 */
export const MOCK_SEMANTIC_COLORS = {
  success: {
    DEFAULT: '#16856b',
    bg: '#e7f5ef',
    text: '#16856b',
  },
  info: {
    DEFAULT: '#246beb',
    bg: '#eaf0f2',
    text: '#246beb',
  },
  warning: {
    DEFAULT: '#d68b17',
    bg: '#fff4dc',
    text: '#d68b17',
  },
  error: {
    DEFAULT: '#d94e50',
    bg: '#fdebec',
    text: '#d94e50',
  },
} as const;

/**
 * Severity display labels
 * @mock
 */
export const MOCK_SEVERITY_LABELS: Record<SeverityLevel, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

/**
 * Severity order for sorting (critical first)
 * @mock
 */
export const MOCK_SEVERITY_ORDER: SeverityLevel[] = ['critical', 'high', 'medium', 'low'];

/**
 * Detection type display labels
 * @mock
 */
export const MOCK_DETECTION_TYPE_LABELS: Record<DetectionType, string> = {
  pothole: 'Pothole',
  streetlight: 'Streetlight',
  drainage: 'Drainage',
  footpath: 'Footpath',
  signage: 'Signage',
  'road-marking': 'Road Marking',
  manhole: 'Manhole',
  vegetation: 'Vegetation',
};

/**
 * Detection type icons (Lucide icon names)
 * @mock
 */
export const MOCK_DETECTION_TYPE_ICONS: Record<DetectionType, string> = {
  pothole: 'CircleAlert',
  streetlight: 'Lightbulb',
  drainage: 'Droplets',
  footpath: 'Footprints',
  signage: 'Signpost',
  'road-marking': 'Minimize2',
  manhole: 'CircleDot',
  vegetation: 'TreePine',
};

/**
 * Inspection status display labels
 * @mock
 */
export const MOCK_INSPECTION_STATUS_LABELS: Record<StatusType, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

/**
 * Inspection status colors
 * @mock
 */
export const MOCK_INSPECTION_STATUS_COLORS: Record<StatusType, { bg: string; text: string }> = {
  pending: { bg: '#fff4dc', text: '#d68b17' },      // warning
  in_progress: { bg: '#eaf0f2', text: '#246beb' },  // info
  resolved: { bg: '#e7f5ef', text: '#16856b' },     // success
};

/**
 * Alert severity colors
 * @mock
 */
export const MOCK_ALERT_SEVERITY_COLORS: Record<SeverityLevel, { bg: string; text: string }> = {
  critical: { bg: '#fdebec', text: '#d94e50' },
  high: { bg: '#fff4dc', text: '#d68b17' },
  medium: { bg: '#eaf0f2', text: '#246beb' },
  low: { bg: '#e7f5ef', text: '#16856b' },
};

/**
 * Freshness thresholds in milliseconds
 * @mock
 */
export const MOCK_FRESHNESS_THRESHOLDS = {
  fresh: 3600000,        // < 1 hour
  recent: 86400000,      // < 24 hours
  older: 604800000,      // < 7 days
} as const;

/**
 * Alert severity type (alias for SeverityLevel)
 * @mock
 */
export type AlertSeverity = SeverityLevel;