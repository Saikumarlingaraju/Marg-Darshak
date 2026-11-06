import { GeoJSON } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface RoadFeatureProperties {
  name: string;
  type: 'highway' | 'arterial' | 'collector' | 'local';
}

// No props needed for RoadNetworkLayer

export function RoadNetworkLayer() {
  const map = useMap();
  const layerRef = useRef<L.GeoJSON | null>(null);

  // If no actual road lines, create synthetic roads from detection points
  // This is a placeholder - in production you'd have actual road network GeoJSON
  const syntheticRoads = {
    type: 'FeatureCollection' as const,
    features: [
      // Major arterial roads in Hyderabad (simplified)
      {
        type: 'Feature' as const,
        id: 'road-outer-ring',
        properties: { name: 'Nehru Outer Ring Road', type: 'arterial' as const },
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [78.451, 17.3997],
            [78.475, 17.3957],
            [78.499, 17.3877],
            [78.531, 17.3677],
            [78.563, 17.3517],
            [78.595, 17.3837],
          ],
        },
      },
      {
        type: 'Feature' as const,
        id: 'road-mg-road',
        properties: { name: 'Banjara Hills Road', type: 'arterial' as const },
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [78.483, 17.3837],
            [78.495, 17.3877],
            [78.507, 17.3901],
          ],
        },
      },
      {
        type: 'Feature' as const,
        id: 'road-brigade',
        properties: { name: 'Road No. 12, Banjara Hills', type: 'collector' as const },
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [78.495, 17.3837],
            [78.5006, 17.3861],
            [78.5054, 17.3885],
          ],
        },
      },
      {
        type: 'Feature' as const,
        id: 'road-hosur',
        properties: { name: 'Hosur Road', type: 'highway' as const },
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [78.491, 17.3677],
            [78.507, 17.3437],
            [78.523, 17.3197],
            [78.539, 17.2877],
          ],
        },
      },
      {
        type: 'Feature' as const,
        id: 'road-sarjapur',
        properties: { name: 'HITEC City Road', type: 'arterial' as const },
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [78.507, 17.3597],
            [78.539, 17.3437],
            [78.571, 17.3597],
          ],
        },
      },
      {
        type: 'Feature' as const,
        id: 'road-whitefield',
        properties: { name: 'Madhapur Main Road', type: 'arterial' as const },
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [78.587, 17.3797],
            [78.611, 17.3837],
          ],
        },
      },
    ],
  };

  const style = (feature?: GeoJSON.Feature<GeoJSON.Geometry, RoadFeatureProperties>) => {
    const roadType = feature?.properties?.type || 'local';
    const styles: Record<string, L.PathOptions> = {
      highway: { color: '#dc2626', weight: 3, opacity: 0.7, dashArray: '10, 5' },
      arterial: { color: '#ea580c', weight: 2.5, opacity: 0.7 },
      collector: { color: '#d97706', weight: 2, opacity: 0.6 },
      local: { color: '#78716c', weight: 1.5, opacity: 0.5 },
    };
    return styles[roadType] || styles.local;
  };

  const highlightStyle = {
    weight: 4,
    opacity: 0.9,
    dashArray: '',
  };

  useEffect(() => {
    if (layerRef.current && map) {
      try {
        const bounds = layerRef.current.getBounds();
        if (bounds.isValid()) {
          // Don't auto-fit for roads, let map center handle it
        }
      } catch {
        // Ignore
      }
    }
  }, [map]);

  const handleMouseOver = (event: L.LeafletMouseEvent) => {
    const layer = event.layer as L.Path;
    if (!layer || typeof layer.setStyle !== 'function') return;
    layer.setStyle(highlightStyle);
    layer.bringToFront();
  };

  const handleMouseOut = (event: L.LeafletMouseEvent) => {
    const layer = event.layer as L.Path;
    if (!layer || typeof layer.setStyle !== 'function') return;
    const feature = (layer as L.Layer & { feature?: GeoJSON.Feature }).feature;
    if (feature) {
      layer.setStyle(style(feature as GeoJSON.Feature<GeoJSON.LineString, RoadFeatureProperties>));
    }
  };

  // Use synthetic roads since mock data only has points
  const geojsonData = syntheticRoads;

  return (
    <GeoJSON
      ref={layerRef}
      data={geojsonData}
      style={style}
      onEachFeature={(_feature, layer) => {
        layer.on({
          mouseover: handleMouseOver,
          mouseout: handleMouseOut,
        });
      }}
      />
  );
}