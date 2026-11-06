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
      // Major arterial roads in Bengaluru (simplified)
      {
        type: 'Feature' as const,
        id: 'road-outer-ring',
        properties: { name: 'Outer Ring Road', type: 'arterial' as const },
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [77.5500, 12.9900],
            [77.5800, 12.9850],
            [77.6100, 12.9750],
            [77.6500, 12.9500],
            [77.6900, 12.9300],
            [77.7300, 12.9700],
          ],
        },
      },
      {
        type: 'Feature' as const,
        id: 'road-mg-road',
        properties: { name: 'MG Road', type: 'arterial' as const },
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [77.5900, 12.9700],
            [77.6050, 12.9750],
            [77.6200, 12.9780],
          ],
        },
      },
      {
        type: 'Feature' as const,
        id: 'road-brigade',
        properties: { name: 'Brigade Road', type: 'collector' as const },
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [77.6050, 12.9700],
            [77.6120, 12.9730],
            [77.6180, 12.9760],
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
            [77.6000, 12.9500],
            [77.6200, 12.9200],
            [77.6400, 12.8900],
            [77.6600, 12.8500],
          ],
        },
      },
      {
        type: 'Feature' as const,
        id: 'road-sarjapur',
        properties: { name: 'Sarjapur Road', type: 'arterial' as const },
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [77.6200, 12.9400],
            [77.6600, 12.9200],
            [77.7000, 12.9400],
          ],
        },
      },
      {
        type: 'Feature' as const,
        id: 'road-whitefield',
        properties: { name: 'Whitefield Main Road', type: 'arterial' as const },
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [77.7200, 12.9650],
            [77.7500, 12.9700],
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
    layer.setStyle(highlightStyle);
    layer.bringToFront();
  };

  const handleMouseOut = (event: L.LeafletMouseEvent) => {
    const layer = event.layer as L.Path;
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