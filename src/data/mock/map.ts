/**
 * Mock Map data for Marg-Darshak Dashboard
 * Map layers and urban blocks for Hyderabad
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
              title: 'Large pothole on Banjara Hills Road',
              detectedAt: '2026-11-04T08:30:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [78.4985, 17.3852],
            },
          },
          {
            type: 'Feature',
            id: 'ph-002',
            properties: {
              id: 'ph-002',
              severity: 'high',
              title: 'Pothole near Road No. 12, Banjara Hills junction',
              detectedAt: '2026-11-04T10:15:00Z',
              status: 'in_progress',
            },
            geometry: {
              type: 'Point',
              coordinates: [78.4997, 17.3857],
            },
          },
          {
            type: 'Feature',
            id: 'ph-003',
            properties: {
              id: 'ph-003',
              severity: 'medium',
              title: 'Surface damage on Jubilee Hills Road',
              detectedAt: '2026-11-03T14:20:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [78.4968, 17.387],
            },
          },
          {
            type: 'Feature',
            id: 'ph-004',
            properties: {
              id: 'ph-004',
              severity: 'high',
              title: 'Deep pothole on Somajiguda Main Road',
              detectedAt: '2026-11-04T06:45:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [78.4896, 17.3908],
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
              coordinates: [78.5216, 17.3713],
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
              title: 'Streetlight out on 100ft Road, Begumpet',
              detectedAt: '2026-11-04T07:00:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [78.5226, 17.3904],
            },
          },
          {
            type: 'Feature',
            id: 'sl-002',
            properties: {
              id: 'sl-002',
              severity: 'medium',
              title: 'Flickering light on Kondapur 80ft Road',
              detectedAt: '2026-11-03T19:30:00Z',
              status: 'in_progress',
            },
            geometry: {
              type: 'Point',
              coordinates: [78.5112, 17.3559],
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
              coordinates: [78.5098, 17.3836],
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
              coordinates: [78.5117, 17.3423],
            },
          },
          {
            type: 'Feature',
            id: 'dr-002',
            properties: {
              id: 'dr-002',
              severity: 'high',
              title: 'Overflowing manhole near Gachibowli',
              detectedAt: '2026-11-03T11:00:00Z',
              status: 'in_progress',
            },
            geometry: {
              type: 'Point',
              coordinates: [78.5408, 17.2842],
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
              coordinates: [78.4957, 17.3879],
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
              coordinates: [78.486, 17.3888],
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
              title: 'Missing speed limit sign on Nehru Outer Ring Road',
              detectedAt: '2026-11-03T15:00:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [78.561, 17.3743],
            },
          },
          {
            type: 'Feature',
            id: 'sg-002',
            properties: {
              id: 'sg-002',
              severity: 'low',
              title: 'Faded directional sign near Secunderabad Flyover',
              detectedAt: '2026-11-02T10:30:00Z',
              status: 'resolved',
            },
            geometry: {
              type: 'Point',
              coordinates: [78.4888, 17.4364],
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
              coordinates: [78.484, 17.4177],
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
              title: 'Missing manhole cover on HITEC City Road',
              detectedAt: '2026-11-04T06:00:00Z',
              status: 'pending',
            },
            geometry: {
              type: 'Point',
              coordinates: [78.5376, 17.3473],
            },
          },
          {
            type: 'Feature',
            id: 'mh-002',
            properties: {
              id: 'mh-002',
              severity: 'critical',
              title: 'Damaged manhole frame on Madhapur Main Road',
              detectedAt: '2026-11-04T04:30:00Z',
              status: 'in_progress',
            },
            geometry: {
              type: 'Point',
              coordinates: [78.605, 17.3836],
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
              coordinates: [78.516, 17.3553],
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
 * Mock Urban Blocks for Hyderabad wards/zones
 * Polygons representing administrative boundaries with fill colors
 * Colors use exact chart.series1-5 from tailwind.config.ts
 * @mock
 */
export const MOCK_URBAN_BLOCKS: UrbanBlock[] = [
  {
    id: 'ward-150',
    name: 'Begumpet Ward 150',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [78.5166, 17.3837],
        [78.527, 17.3837],
        [78.527, 17.3957],
        [78.5166, 17.3957],
        [78.5166, 17.3837],
      ]],
    },
    fillColor: 'rgba(36, 107, 235, 0.15)',
    borderColor: '#246beb',
  },
  {
    id: 'ward-151',
    name: 'Kondapur Ward 151',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [78.5054, 17.3501],
        [78.519, 17.3501],
        [78.519, 17.3637],
        [78.5054, 17.3637],
        [78.5054, 17.3501],
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
        [78.5214, 17.3317],
        [78.535, 17.3317],
        [78.535, 17.3453],
        [78.5214, 17.3453],
        [78.5214, 17.3317],
      ]],
    },
    fillColor: 'rgba(101, 157, 186, 0.15)',
    borderColor: '#659dba',
  },
  {
    id: 'ward-153',
    name: 'Tolichowki Ward 153',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [78.495, 17.3357],
        [78.5086, 17.3357],
        [78.5086, 17.3493],
        [78.495, 17.3493],
        [78.495, 17.3357],
      ]],
    },
    fillColor: 'rgba(126, 178, 194, 0.15)',
    borderColor: '#7eb2c2',
  },
  {
    id: 'ward-154',
    name: 'Kukatpally Ward 154',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [78.479, 17.3437],
        [78.4926, 17.3437],
        [78.4926, 17.3573],
        [78.479, 17.3573],
        [78.479, 17.3437],
      ]],
    },
    fillColor: 'rgba(161, 196, 205, 0.15)',
    borderColor: '#a1c4cd',
  },
  {
    id: 'ward-155',
    name: 'Madhapur Ward 155',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [78.599, 17.3757],
        [78.615, 17.3757],
        [78.615, 17.3917],
        [78.599, 17.3917],
        [78.599, 17.3757],
      ]],
    },
    fillColor: 'rgba(200, 212, 221, 0.15)',
    borderColor: '#c8d4dd',
  },
  {
    id: 'ward-156',
    name: 'Gachibowli Ward 156',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [78.535, 17.2757],
        [78.551, 17.2757],
        [78.551, 17.2917],
        [78.535, 17.2917],
        [78.535, 17.2757],
      ]],
    },
    fillColor: 'rgba(222, 229, 237, 0.15)',
    borderColor: '#dde5ed',
  },
  {
    id: 'ward-157',
    name: 'LB Nagar Ward 157',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [78.451, 17.3997],
        [78.463, 17.3997],
        [78.463, 17.4117],
        [78.451, 17.4117],
        [78.451, 17.3997],
      ]],
    },
    fillColor: 'rgba(234, 240, 242, 0.15)',
    borderColor: '#eaf0f2',
  },
  {
    id: 'ward-158',
    name: 'Ameerpet Ward 158',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [78.463, 17.4077],
        [78.475, 17.4077],
        [78.475, 17.4197],
        [78.463, 17.4197],
        [78.463, 17.4077],
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
        [78.483, 17.3837],
        [78.4974, 17.3837],
        [78.4974, 17.3957],
        [78.483, 17.3957],
        [78.483, 17.3837],
      ]],
    },
    fillColor: 'rgba(36, 107, 235, 0.1)',
    borderColor: '#246beb',
  },
] as const;

/**
 * Map viewport configuration for Hyderabad
 * @mock
 */
export const MOCK_MAP_VIEWPORT = {
  center: [78.4867, 17.385] as [number, number],
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