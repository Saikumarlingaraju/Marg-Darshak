/**
 * Mock KPI data for Marg-Darshak Dashboard
 * 4 KPI cards matching the implementation plan
 * @packageDocumentation
 */

import type { KPICardData } from '@/lib/api';

/**
 * Mock KPI Cards - 4 cards matching the implementation plan:
 * 1. Total Detections (primary)
 * 2. Critical Issues (error)
 * 3. Resolved This Week (success)
 * 4. Avg Resolution Time (primary)
 * @mock
 */
export const MOCK_KPI_CARDS: KPICardData[] = [
  {
    id: 'kpi-total-detections',
    label: 'Total observations',
    value: '128,432',
    trend: '↑ 8.6% from previous period',
    trendType: 'up',
    color: 'primary',
  },
  {
    id: 'kpi-critical-issues',
    label: 'Detected issues',
    value: '2,486',
    trend: '1.94% of observations',
    trendType: 'down',
    color: 'primary',
  },
  {
    id: 'kpi-resolved-week',
    label: 'Critical issues',
    value: '148',
    trend: 'Require priority inspection',
    trendType: 'neutral',
    color: 'error',
  },
  {
    id: 'kpi-avg-resolution',
    label: 'Areas monitored',
    value: '24 / 30',
    trend: 'Wards · 1,284 km surveyed',
    trendType: 'neutral',
    color: 'primary',
  },
] as const;

/**
 * Individual KPI accessors for convenience
 * @mock
 */
export const MOCK_KPI_TOTAL_DETECTIONS = MOCK_KPI_CARDS[0];
export const MOCK_KPI_CRITICAL_ISSUES = MOCK_KPI_CARDS[1];
export const MOCK_KPI_RESOLVED_WEEK = MOCK_KPI_CARDS[2];
export const MOCK_KPI_AVG_RESOLUTION = MOCK_KPI_CARDS[3];