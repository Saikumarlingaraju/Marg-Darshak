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
    label: 'Total Detections',
    value: '1,247',
    trend: '+12.5% vs last week',
    trendType: 'up',
    color: 'primary',
  },
  {
    id: 'kpi-critical-issues',
    label: 'Critical Issues',
    value: '23',
    trend: '-3 from yesterday',
    trendType: 'down',
    color: 'error',
  },
  {
    id: 'kpi-resolved-week',
    label: 'Resolved This Week',
    value: '89',
    trend: '+15 vs last week',
    trendType: 'up',
    color: 'success',
  },
  {
    id: 'kpi-avg-resolution',
    label: 'Avg Resolution Time',
    value: '4.2 hrs',
    trend: '-0.8 hrs vs last month',
    trendType: 'down',
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