/**
 * Mock Chart data for Marg-Darshak Dashboard
 * Detection trends (7 days) and issue distribution (5 bars with exact Figma colors)
 * @packageDocumentation
 */

import type { ChartDataPoint, BarChartData } from '@/lib/api';

/**
 * Mock Detection Trends - 7 days of data for line/area chart
 * Realistic Hyderabad urban infrastructure detection data
 * @mock
 */
export const MOCK_DETECTION_TRENDS: ChartDataPoint[] = [
  { day: 'Mon', value: 42 },
  { day: 'Tue', value: 38 },
  { day: 'Wed', value: 51 },
  { day: 'Thu', value: 45 },
  { day: 'Fri', value: 56 },
  { day: 'Sat', value: 34 },
  { day: 'Sun', value: 28 },
] as const;

/**
 * Mock Issue Distribution - 5 bars with exact Figma colors
 * Categories match the detection types, top 5 by frequency
 * Colors use exact chart.series1-5 from tailwind.config.ts
 * @mock
 */
export const MOCK_ISSUE_DISTRIBUTION: BarChartData[] = [
  {
    category: 'Pothole',
    count: 312,
    percentage: 25.0,
    color: '#246beb', // chart.series1
  },
  {
    category: 'Streetlight',
    count: 245,
    percentage: 19.6,
    color: '#4984d2', // chart.series2
  },
  {
    category: 'Drainage',
    count: 198,
    percentage: 15.9,
    color: '#659dba', // chart.series3
  },
  {
    category: 'Footpath',
    count: 176,
    percentage: 14.1,
    color: '#7eb2c2', // chart.series4
  },
  {
    category: 'Signage',
    count: 134,
    percentage: 10.7,
    color: '#a1c4cd', // chart.series5
  },
] as const;

/**
 * Full issue distribution including all 8 types (for reference)
 * @mock
 */
export const MOCK_FULL_ISSUE_DISTRIBUTION: BarChartData[] = [
  {
    category: 'Pothole',
    count: 312,
    percentage: 25.0,
    color: '#246beb',
  },
  {
    category: 'Streetlight',
    count: 245,
    percentage: 19.6,
    color: '#4984d2',
  },
  {
    category: 'Drainage',
    count: 198,
    percentage: 15.9,
    color: '#659dba',
  },
  {
    category: 'Footpath',
    count: 176,
    percentage: 14.1,
    color: '#7eb2c2',
  },
  {
    category: 'Signage',
    count: 134,
    percentage: 10.7,
    color: '#a1c4cd',
  },
  {
    category: 'Road Marking',
    count: 89,
    percentage: 7.1,
    color: '#c8d4dd',
  },
  {
    category: 'Manhole',
    count: 58,
    percentage: 4.7,
    color: '#dde5ed',
  },
  {
    category: 'Vegetation',
    count: 35,
    percentage: 2.8,
    color: '#eaf0f2',
  },
] as const;

/**
 * Weekly trend summary
 * @mock
 */
export const MOCK_WEEKLY_TREND_SUMMARY = {
  totalDetections: 294,
  avgPerDay: 42,
  peakDay: 'Friday',
  peakValue: 56,
  lowestDay: 'Sunday',
  lowestValue: 28,
  weekOverWeekChange: 12.5,
} as const;

/**
 * Chart configuration constants
 * @mock
 */
export const MOCK_CHART_CONFIG = {
  detectionTrends: {
    height: 200,
    showArea: true,
    areaOpacity: 0.15,
    lineColor: '#4984d2',
    areaColor: 'rgba(73, 132, 210, 0.15)',
    gridColor: '#dde5ed',
    showGrid: true,
    showDots: true,
    dotRadius: 4,
    strokeWidth: 2,
  },
  issueDistribution: {
    height: 240,
    barRadius: 4,
    maxBarWidth: 40,
    showValues: true,
    showPercentage: true,
    gridColor: '#dde5ed',
  },
} as const;