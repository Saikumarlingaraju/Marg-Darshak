/**
 * Mock Map data for Marg-Darshak Dashboard
 * Map layers and urban blocks for Bengaluru
 * @packageDocumentation
 */

import type { MapLayerData, UrbanBlock } from '@/lib/api';

/**
 * Mock Map Infrastructure Layers
 * Contains GeoJSON layers for different infrastructure types
 * @mock
 */
export const MOCK_MAP_INFRASTRUCTURE: MapLayerData = {
  layers: [
    {
      id: 'potholes-layer',
      type: 'pothole',
      geojson: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: 'ph-001',
            properties: {
              id: 'ph-001',
              severity: 'critical',
              title: 'Large pothole on MG Road',
              detectedAt: '2026-11-04T08:30:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6093, 12.9719],
            },
          },
          {
            type: 'Feature',
            id: 'ph-002',
            properties: {
              id: 'ph-002',
              severity: 'high',
              title: 'Pothole near Brigade Road junction',
              detectedAt: '2026-11-04T10:15:00Z',
              status: 'in_progress',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6108, 12.9725],
            },
          },
          {
            type: 'Feature',
            id: 'ph-003',
            properties: {
              id: 'ph-003',
              severity: 'medium',
              title: 'Surface damage on Church Street',
              detectedAt: '2026-11-03T14:20:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6072, 12.9741],
            },
          },
          {
            type: 'Feature',
            id: 'ph-004',
            properties: {
              id: 'ph-004',
              severity: 'high',
              title: 'Deep pothole on Residency Road',
              detectedAt: '2026-11-04T06:45:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.5982, 12.9789],
            },
          },
          {
            type: 'Feature',
            id: 'ph-005',
            properties: {
              id: 'ph-005',
              severity: 'critical',
              title: 'Multiple potholes on Old Airport Road',
              detectedAt: '2026-11-03T16:30:00Z',
              status: 'in_progress',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6382, 12.9545],
            },
          },
        ],
      },
      style: {
        radius: 8,
        fillColor: '#d94e50',
        fillOpacity: 0.8,
        strokeColor: '#ffffff',
        strokeWidth: 2,
      },
      visible: true,
    },
    {
      id: 'streetlights-layer',
      type: 'streetlight',
      geojson: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: 'sl-001',
            properties: {
              id: 'sl-001',
              severity: 'high',
              title: 'Streetlight out on 100ft Road, Indiranagar',
              detectedAt: '2026-11-04T07:00:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6395, 12.9784],
            },
          },
          {
            type: 'Feature',
            id: 'sl-002',
            properties: {
              id: 'sl-002',
              severity: 'medium',
              title: 'Flickering light on Koramangala 80ft Road',
              detectedAt: '2026-11-03T19:30:00Z',
              status: 'in_progress',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6252, 12.9352],
            },
          },
          {
            type: 'Feature',
            id: 'sl-003',
            properties: {
              id: 'sl-003',
              severity: 'low',
              title: 'Dim streetlight near Forum Mall',
              detectedAt: '2026-11-02T20:45:00Z',
              status: 'resolved',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6235, 12.9698],
            },
          },
        ],
      },
      style: {
        radius: 6,
        fillColor: '#d68b17',
        fillOpacity: 0.8,
        strokeColor: '#ffffff',
        strokeWidth: 1.5,
      },
      visible: true,
    },
    {
      id: 'drainage-layer',
      type: 'drainage',
      geojson: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: 'dr-001',
            properties: {
              id: 'dr-001',
              severity: 'critical',
              title: 'Blocked drain causing flooding on Hosur Road',
              detectedAt: '2026-11-04T05:30:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6258, 12.9182],
            },
          },
          {
            type: 'Feature',
            id: 'dr-002',
            properties: {
              id: 'dr-002',
              severity: 'high',
              title: 'Overflowing manhole near Electronic City',
              detectedAt: '2026-11-03T11:00:00Z',
              status: 'in_progress',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6622, 12.8456],
            },
          },
        ],
      },
      style: {
        radius: 7,
        fillColor: '#d94e50',
        fillOpacity: 0.75,
        strokeColor: '#ffffff',
        strokeWidth: 2,
      },
      visible: true,
    },
    {
      id: 'footpaths-layer',
      type: 'footpath',
      geojson: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: 'fp-001',
            properties: {
              id: 'fp-001',
              severity: 'medium',
              title: 'Broken footpath tiles on Commercial Street',
              detectedAt: '2026-11-03T09:15:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6058, 12.9752],
            },
          },
          {
            type: 'Feature',
            id: 'fp-002',
            properties: {
              id: 'fp-002',
              severity: 'low',
              title: 'Uneven footpath near Cubbon Park',
              detectedAt: '2026-11-02T13:20:00Z',
              status: 'resolved',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.5937, 12.9763],
            },
          },
        ],
      },
      style: {
        radius: 6,
        fillColor: '#246beb',
        fillOpacity: 0.8,
        strokeColor: '#ffffff',
        strokeWidth: 1.5,
      },
      visible: true,
    },
    {
      id: 'signage-layer',
      type: 'signage',
      geojson: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: 'sg-001',
            properties: {
              id: 'sg-001',
              severity: 'medium',
              title: 'Missing speed limit sign on Outer Ring Road',
              detectedAt: '2026-11-03T15:00:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6875, 12.9582],
            },
          },
          {
            type: 'Feature',
            id: 'sg-002',
            properties: {
              id: 'sg-002',
              severity: 'low',
              title: 'Faded directional sign near Hebbal Flyover',
              detectedAt: '2026-11-02T10:30:00Z',
              status: 'resolved',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.5972, 13.0358],
            },
          },
        ],
      },
      style: {
        radius: 5,
        fillColor: '#246beb',
        fillOpacity: 0.8,
        strokeColor: '#ffffff',
        strokeWidth: 1.5,
      },
      visible: false,
    },
    {
      id: 'road-markings-layer',
      type: 'road-marking',
      geojson: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: 'rm-001',
            properties: {
              id: 'rm-001',
              severity: 'medium',
              title: 'Faded lane markers on Bellary Road',
              detectedAt: '2026-11-03T08:00:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.5912, 13.0125],
            },
          },
        ],
      },
      style: {
        radius: 5,
        fillColor: '#246beb',
        fillOpacity: 0.75,
        strokeColor: '#ffffff',
        strokeWidth: 1.5,
      },
      visible: false,
    },
    {
      id: 'manholes-layer',
      type: 'manhole',
      geojson: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: 'mh-001',
            properties: {
              id: 'mh-001',
              severity: 'high',
              title: 'Missing manhole cover on Sarjapur Road',
              detectedAt: '2026-11-04T06:00:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6582, 12.9245],
            },
          },
          {
            type: 'Feature',
            id: 'mh-002',
            properties: {
              id: 'mh-002',
              severity: 'critical',
              title: 'Damaged manhole frame on Whitefield Main Road',
              detectedAt: '2026-11-04T04:30:00Z',
              status: 'in_progress',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.7425, 12.9698],
            },
          },
        ],
      },
      style: {
        radius: 7,
        fillColor: '#d68b17',
        fillOpacity: 0.8,
        strokeColor: '#ffffff',
        strokeWidth: 2,
      },
      visible: true,
    },
    {
      id: 'vegetation-layer',
      type: 'vegetation',
      geojson: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: 'vg-001',
            properties: {
              id: 'vg-001',
              severity: 'low',
              title: 'Overgrown vegetation blocking footpath on 80ft Road',
              detectedAt: '2026-11-02T11:00:00Z',
              status: 'resolved',
            },
            geometry: {
              type: 'Point',
              coordinates: [77.6312, 12.9345],
            },
          },
        ],
      },
      style: {
        radius: 6,
        fillColor: '#16856b',
        fillOpacity: 0.8,
        strokeColor: '#ffffff',
        strokeWidth: 1.5,
      },
      visible: false,
    },
  ],
};

/**
 * Mock Urban Blocks for Bengaluru wards/zones
 * Polygons representing administrative boundaries with fill colors
 * Colors use exact chart.series1-5 from tailwind.config.ts
 * @mock
 */
export const MOCK_URBAN_BLOCKS: UrbanBlock[] = [
  {
    id: 'ward-150',
    name: 'Indiranagar Ward 150',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [77.6320, 12.9700],
        [77.6450, 12.9700],
        [77.6450, 12.9850],
        [77.6320, 12.9850],
        [77.6320, 12.9700],
      ]],
    },
    fillColor: 'rgba(36, 107, 235, 0.15)',
    borderColor: '#246beb',
  },
  {
    id: 'ward-151',
    name: 'Koramangala Ward 151',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [77.6180, 12.9280],
        [77.6350, 12.9280],
        [77.6350, 12.9450],
        [77.6180, 12.9450],
        [77.6180, 12.9280],
      ]],
    },
    fillColor: 'rgba(73, 132, 210, 0.15)',
    borderColor: '#4984d2',
  },
  {
    id: 'ward-152',
    name: 'HSR Layout Ward 152',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [77.6380, 12.9050],
        [77.6550, 12.9050],
        [77.6550, 12.9220],
        [77.6380, 12.9220],
        [77.6380, 12.9050],
      ]],
    },
    fillColor: 'rgba(101, 157, 186, 0.15)',
    borderColor: '#659dba',
  },
  {
    id: 'ward-153',
    name: 'BTM Layout Ward 153',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [77.6050, 12.9100],
        [77.6220, 12.9100],
        [77.6220, 12.9270],
        [77.6050, 12.9270],
        [77.6050, 12.9100],
      ]],
    },
    fillColor: 'rgba(126, 178, 194, 0.15)',
    borderColor: '#7eb2c2',
  },
  {
    id: 'ward-154',
    name: 'Jayanagar Ward 154',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [77.5850, 12.9200],
        [77.6020, 12.9200],
        [77.6020, 12.9370],
        [77.5850, 12.9370],
        [77.5850, 12.9200],
      ]],
    },
    fillColor: 'rgba(161, 196, 205, 0.15)',
    borderColor: '#a1c4cd',
  },
  {
    id: 'ward-155',
    name: 'Whitefield Ward 155',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [77.7350, 12.9600],
        [77.7550, 12.9600],
        [77.7550, 12.9800],
        [77.7350, 12.9800],
        [77.7350, 12.9600],
      ]],
    },
    fillColor: 'rgba(200, 212, 221, 0.15)',
    borderColor: '#c8d4dd',
  },
  {
    id: 'ward-156',
    name: 'Electronic City Ward 156',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [77.6550, 12.8350],
        [77.6750, 12.8350],
        [77.6750, 12.8550],
        [77.6550, 12.8550],
        [77.6550, 12.8350],
      ]],
    },
    fillColor: 'rgba(222, 229, 237, 0.15)',
    borderColor: '#dde5ed',
  },
  {
    id: 'ward-157',
    name: 'Rajajinagar Ward 157',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [77.5500, 12.9900],
        [77.5650, 12.9900],
        [77.5650, 13.0050],
        [77.5500, 13.0050],
        [77.5500, 12.9900],
      ]],
    },
    fillColor: 'rgba(234, 240, 242, 0.15)',
    borderColor: '#eaf0f2',
  },
  {
    id: 'ward-158',
    name: 'Malleshwaram Ward 158',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [77.5650, 13.0000],
        [77.5800, 13.0000],
        [77.5800, 13.0150],
        [77.5650, 13.0150],
        [77.5650, 13.0000],
      ]],
    },
    fillColor: 'rgba(243, 246, 249, 0.15)',
    borderColor: '#f3f6f9',
  },
  {
    id: 'ward-159',
    name: 'CBD Ward 159',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [77.5900, 12.9700],
        [77.6080, 12.9700],
        [77.6080, 12.9850],
        [77.5900, 12.9850],
        [77.5900, 12.9700],
      ]],
    },
    fillColor: 'rgba(36, 107, 235, 0.1)',
    borderColor: '#246beb',
  },
] as const;

/**
 * Map viewport configuration for Bengaluru
 * @mock
 */
export const MOCK_MAP_VIEWPORT = {
  center: [77.5946, 12.9716] as [number, number],
  zoom: 11,
  minZoom: 9,
  maxZoom: 18,
  pitch: 0,
  bearing: 0,
} as const;

/**
 * Layer visibility defaults
 * @mock
 */
export const MOCK_LAYER_VISIBILITY_DEFAULTS = {
  'potholes-layer': true,
  'streetlights-layer': true,
  'drainage-layer': true,
  'footpaths-layer': true,
  'signage-layer': false,
  'road-markings-layer': false,
  'manholes-layer': true,
  'vegetation-layer': false,
} as const;