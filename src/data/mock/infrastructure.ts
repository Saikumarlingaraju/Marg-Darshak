/**
 * Mock Infrastructure data for Marg-Darshak Dashboard
 * Priority queue and recent detections
 * @packageDocumentation
 */

import type { PriorityItem, DetectionRecord, PaginatedResponse } from '@/lib/api';

/**
 * Mock Priority Inspection Queue - items needing attention
 * Ordered by severity (critical first) then by detection time
 * @mock
 */
export const MOCK_PRIORITY_QUEUE: PriorityItem[] = [
  {
    id: 'insp-001',
    title: 'Large pothole on Nehru Outer Ring Road',
    severity: 'critical',
    location: 'ORR, Near Marathahalli Bridge',
    detectedAt: '2026-11-05T08:30:00Z',
    status: 'pending',
  },
  {
    id: 'insp-002',
    title: 'Streetlight outage - 12 poles',
    severity: 'high',
    location: 'Madhapur Main Road',
    detectedAt: '2026-11-05T07:15:00Z',
    status: 'pending',
  },
  {
    id: 'insp-003',
    title: 'Drainage blockage causing flooding',
    severity: 'critical',
    location: 'Kondapur 4th Block',
    detectedAt: '2026-11-05T06:45:00Z',
    status: 'in_progress',
  },
  {
    id: 'insp-004',
    title: 'Damaged footpath slabs',
    severity: 'medium',
    location: 'Begumpet 100 Feet Road',
    detectedAt: '2026-11-04T18:20:00Z',
    status: 'pending',
  },
  {
    id: 'insp-005',
    title: 'Missing regulatory signage',
    severity: 'high',
    location: 'Gachibowli Phase 1',
    detectedAt: '2026-11-04T16:30:00Z',
    status: 'pending',
  },
  {
    id: 'insp-006',
    title: 'Faded road markings',
    severity: 'medium',
    location: 'Secunderabad Flyover Approach',
    detectedAt: '2026-11-04T14:10:00Z',
    status: 'resolved',
  },
  {
    id: 'insp-007',
    title: 'Manhole cover displaced',
    severity: 'critical',
    location: 'Kukatpally 9th Block',
    detectedAt: '2026-11-04T11:55:00Z',
    status: 'in_progress',
  },
  {
    id: 'insp-008',
    title: 'Overgrown vegetation on median',
    severity: 'low',
    location: 'Mehdipatnam Road',
    detectedAt: '2026-11-03T15:20:00Z',
    status: 'pending',
  },
  {
    id: 'insp-009',
    title: 'Broken pedestrian railing',
    severity: 'high',
    location: 'Banjara Hills Road Metro Station',
    detectedAt: '2026-11-03T10:00:00Z',
    status: 'pending',
  },
  {
    id: 'insp-010',
    title: 'Cracked speed breaker',
    severity: 'medium',
    location: 'HITEC City Road Junction',
    detectedAt: '2026-11-02T09:30:00Z',
    status: 'resolved',
  },
] as const;

/**
 * Mock Recent Detections - for the data table
 * 12 items across all 8 detection types with realistic Hyderabad locations
 * @mock
 */
export const MOCK_RECENT_DETECTIONS: PaginatedResponse<DetectionRecord> = {
  data: [
    {
      id: 'det-001',
      detectionType: 'pothole',
      title: 'Deep pothole on service road',
      location: 'ORR Service Road, Bellandur',
      severity: 'critical',
      detectedAt: '2026-11-05T09:15:00Z',
      imageKey: 'hyderabad/2026-11-05/det-001.jpg',
    },
    {
      id: 'det-002',
      detectionType: 'streetlight',
      title: 'Streetlight not functioning',
      location: 'Madhapur, ITPL Main Road',
      severity: 'high',
      detectedAt: '2026-11-05T08:45:00Z',
      imageKey: 'hyderabad/2026-11-05/det-002.jpg',
    },
    {
      id: 'det-003',
      detectionType: 'drainage',
      title: 'Storm drain overflow',
      location: 'Kondapur 80 Feet Road',
      severity: 'critical',
      detectedAt: '2026-11-05T08:20:00Z',
      imageKey: 'hyderabad/2026-11-05/det-003.jpg',
    },
    {
      id: 'det-004',
      detectionType: 'footpath',
      title: 'Broken footpath tiles',
      location: 'Begumpet CMH Road',
      severity: 'medium',
      detectedAt: '2026-11-05T07:50:00Z',
      imageKey: 'hyderabad/2026-11-05/det-004.jpg',
    },
    {
      id: 'det-005',
      detectionType: 'signage',
      title: 'Missing one-way sign',
      location: 'Gachibowli, Hosur Road',
      severity: 'high',
      detectedAt: '2026-11-05T07:30:00Z',
      imageKey: 'hyderabad/2026-11-05/det-005.jpg',
    },
    {
      id: 'det-006',
      detectionType: 'road-marking',
      title: 'Faded zebra crossing',
      location: 'Secunderabad, Near Flyover',
      severity: 'medium',
      detectedAt: '2026-11-05T07:00:00Z',
      imageKey: 'hyderabad/2026-11-05/det-006.jpg',
    },
    {
      id: 'det-007',
      detectionType: 'manhole',
      title: 'Loose manhole cover',
      location: 'Kukatpally 4th T Block',
      severity: 'critical',
      detectedAt: '2026-11-04T18:30:00Z',
      imageKey: 'hyderabad/2026-11-04/det-007.jpg',
    },
    {
      id: 'det-008',
      detectionType: 'vegetation',
      title: 'Overgrown median plants',
      location: 'Mehdipatnam Road, Near IIM',
      severity: 'low',
      detectedAt: '2026-11-04T16:45:00Z',
      imageKey: 'hyderabad/2026-11-04/det-008.jpg',
    },
    {
      id: 'det-009',
      detectionType: 'pothole',
      title: 'Multiple potholes cluster',
      location: 'HITEC City Road, Wipro Gate',
      severity: 'high',
      detectedAt: '2026-11-04T14:20:00Z',
      imageKey: 'hyderabad/2026-11-04/det-009.jpg',
    },
    {
      id: 'det-010',
      detectionType: 'streetlight',
      title: 'Flickering LED streetlight',
      location: 'Banjara Hills Road, Road No. 12, Banjara Hills Junction',
      severity: 'medium',
      detectedAt: '2026-11-04T12:10:00Z',
      imageKey: 'hyderabad/2026-11-04/det-010.jpg',
    },
    {
      id: 'det-011',
      detectionType: 'drainage',
      title: 'Clogged catch basin',
      location: 'Tolichowki 2nd Stage',
      severity: 'high',
      detectedAt: '2026-11-04T10:00:00Z',
      imageKey: 'hyderabad/2026-11-04/det-011.jpg',
    },
    {
      id: 'det-012',
      detectionType: 'footpath',
      title: 'Uneven pavement slabs',
      location: 'Ameerpet 8th Cross',
      severity: 'low',
      detectedAt: '2026-11-04T09:30:00Z',
      imageKey: 'hyderabad/2026-11-04/det-012.jpg',
    },
  ],
  page: 1,
  pageSize: 10,
  total: 12,
  totalPages: 2,
} as const;

/**
 * Mock Active Alerts for the dashboard
 * @mock
 */
export const MOCK_ALERTS = [
  {
    id: 'alert-001',
    type: 'critical_infrastructure',
    message: 'Critical: Multiple potholes reported on ORR near Marathahalli Bridge',
    severity: 'critical' as const,
    createdAt: '2026-11-05T08:30:00Z',
    read: false,
  },
  {
    id: 'alert-002',
    type: 'flooding_risk',
    message: 'High: Drainage blockage causing flooding in Kondapur 4th Block',
    severity: 'high' as const,
    createdAt: '2026-11-05T06:45:00Z',
    read: false,
  },
  {
    id: 'alert-003',
    type: 'safety_hazard',
    message: 'Critical: Manhole cover displaced in Kukatpally 9th Block',
    severity: 'critical' as const,
    createdAt: '2026-11-04T11:55:00Z',
    read: true,
  },
  {
    id: 'alert-004',
    type: 'maintenance_required',
    message: 'High: Streetlight outage affecting 12 poles on Madhapur Main Road',
    severity: 'high' as const,
    createdAt: '2026-11-05T07:15:00Z',
    read: false,
  },
  {
    id: 'alert-005',
    type: 'signage_missing',
    message: 'Medium: Missing regulatory signage at Gachibowli Phase 1',
    severity: 'medium' as const,
    createdAt: '2026-11-04T16:30:00Z',
    read: true,
  },
] as const;