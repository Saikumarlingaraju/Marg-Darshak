import { GeoJSON } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import type { UrbanBlock } from '@/lib/api';
import type { UrbanBlockFeature } from './types';
import type { Feature, Geometry } from 'geojson';

interface UrbanBlocksLayerProps {
  blocks: UrbanBlock[];
  onBlockClick?: (block: UrbanBlock) => void;
}

export function UrbanBlocksLayer({ blocks, onBlockClick }: UrbanBlocksLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.GeoJSON | null>(null);

  // Convert UrbanBlock to GeoJSON FeatureCollection
  const geojsonData = {
    type: 'FeatureCollection' as const,
    features: blocks.map((block): UrbanBlockFeature => ({
      type: 'Feature',
      id: block.id,
      properties: {
        id: block.id,
        name: block.name,
        fillColor: block.fillColor,
        borderColor: block.borderColor,
      },
      geometry: block.geometry,
    })),
  };

  const style = (feature?: Feature<Geometry, UrbanBlockFeature['properties']>) => ({
    fillColor: feature?.properties?.fillColor || 'rgba(36, 107, 235, 0.15)',
    color: feature?.properties?.borderColor || '#246beb',
    weight: 1.5,
    fillOpacity: 0.15,
    dashArray: '4, 4',
  });

  const highlightStyle = {
    weight: 3,
    fillOpacity: 0.3,
    dashArray: '',
  };

  useEffect(() => {
    if (layerRef.current && map) {
      // Fit bounds to show all blocks on initial load
      try {
        const bounds = layerRef.current.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [20, 20], maxZoom: 12 });
        }
      } catch {
        // Ignore if bounds not ready
      }
    }
  }, [map, blocks.length]);

  const handleClick = (event: L.LeafletMouseEvent) => {
    const layer = event.layer as L.Layer & { feature?: UrbanBlockFeature };
    if (layer.feature && onBlockClick) {
      const block = blocks.find((b) => b.id === layer.feature?.properties.id);
      if (block) {
        onBlockClick(block);
      }
    }
  };

  const handleMouseOver = (event: L.LeafletMouseEvent) => {
    const layer = event.layer as L.Path;
    layer.setStyle(highlightStyle);
    layer.bringToFront();
  };

  const handleMouseOut = (event: L.LeafletMouseEvent) => {
    const layer = event.layer as L.Path;
    const feature = (layer as L.Layer & { feature?: UrbanBlockFeature }).feature;
    if (feature) {
      layer.setStyle(style(feature));
    }
  };

  return (
    <GeoJSON
      ref={layerRef}
      data={geojsonData}
      style={style}
      onEachFeature={(_feature, layer) => {
        layer.on({
          click: handleClick,
          mouseover: handleMouseOver,
          mouseout: handleMouseOut,
        });
      }}
      />
  );
}