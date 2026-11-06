import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import { MOCK_MAP_INFRASTRUCTURE, MOCK_URBAN_BLOCKS, MOCK_MAP_VIEWPORT } from '@/data/mock/map';
import { UrbanBlocksLayer } from './UrbanBlocksLayer';
import { RoadNetworkLayer } from './RoadNetworkLayer';
import { DetectionMarkersLayer } from './DetectionMarkersLayer';
import { LayerControls } from './LayerControls';
import { MapFilters } from './MapFilters';
import { MapLegend } from './MapLegend';
import { DetectionDetailsDrawer } from './DetectionDetailsDrawer';
import type { DetectionFeature, LayerVisibility, MapFilters as MapFiltersType } from './types';

interface MapContainerProps {
  className?: string;
  style?: React.CSSProperties;
  center?: [number, number];
  zoom?: number;
}

export function MapContainer({
  className,
  style,
  center = MOCK_MAP_VIEWPORT.center as [number, number],
  zoom = MOCK_MAP_VIEWPORT.zoom,
}: MapContainerProps) {
  const [mapReady, setMapReady] = useState(false);
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    urbanBlocks: true,
    roadNetwork: true,
    detectionMarkers: true,
  });
  const [filters, setFilters] = useState<MapFiltersType>({
    severity: ['critical', 'high', 'medium', 'low'],
    detectionTypes: [],
    urbanBlocks: [],
  });
  const [selectedDetection, setSelectedDetection] = useState<DetectionFeature | null>(null);

  // Combine all detection features from mock data
  const allDetections = MOCK_MAP_INFRASTRUCTURE.layers.flatMap((layer) =>
    layer.geojson.features.map((feature: any) => ({
      ...feature,
      properties: {
        ...feature.properties,
        layerType: layer.type,
        layerId: layer.id,
      },
    }))
  ) as DetectionFeature[];

  // Filter detections based on active filters
  const filteredDetections = allDetections.filter((detection) => {
    const severityMatch = filters.severity.length === 0 || filters.severity.includes(detection.properties.severity);
    const typeMatch = filters.detectionTypes.length === 0 || filters.detectionTypes.includes(detection.properties.layerType);
    const blockMatch = filters.urbanBlocks.length === 0 || filters.urbanBlocks.includes(detection.properties.urbanBlock || '');
    return severityMatch && typeMatch && blockMatch;
  });

  useEffect(() => {
    // Simulate map initialization
    const timer = setTimeout(() => setMapReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!mapReady) {
    return (
      <div
        className={cn('relative w-full h-full bg-neutral-100 animate-pulse', className)}
        style={style}
        role="status"
        aria-label="Loading map..."
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-body-sm text-neutral-500">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full h-full rounded-xl overflow-hidden', className)} style={style}>
      <LeafletMapContainer
        center={center}
        zoom={zoom}
        minZoom={MOCK_MAP_VIEWPORT.minZoom}
        maxZoom={MOCK_MAP_VIEWPORT.maxZoom}
        className="w-full h-full"
        scrollWheelZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
        boxZoom={true}
        keyboard={true}
        attributionControl={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {/* Urban Blocks Layer */}
        {layerVisibility.urbanBlocks && (
          <UrbanBlocksLayer
            blocks={MOCK_URBAN_BLOCKS}
            onBlockClick={(block) => {
              // Could filter by block
              setFilters((prev) => ({
                ...prev,
                urbanBlocks: prev.urbanBlocks.includes(block.id)
                  ? prev.urbanBlocks.filter((b) => b !== block.id)
                  : [...prev.urbanBlocks, block.id],
              }));
            }}
          />
        )}

        {/* Road Network Layer */}
        {layerVisibility.roadNetwork && <RoadNetworkLayer />}

        {/* Detection Markers Layer */}
        {layerVisibility.detectionMarkers && (
          <DetectionMarkersLayer
            detections={filteredDetections}
            onDetectionClick={setSelectedDetection}
          />
        )}

        {/* Layer Controls Overlay */}
        <LayerControls
          visibility={layerVisibility}
          onChange={setLayerVisibility}
        />

        {/* Map Filters Overlay */}
        <MapFilters
          filters={filters}
          onChange={setFilters}
          availableTypes={Array.from(new Set(allDetections.map((d) => d.properties.layerType)))}
          availableBlocks={MOCK_URBAN_BLOCKS.map((b) => ({ id: b.id, name: b.name }))}
        />

        {/* Map Legend Overlay */}
        <MapLegend />

        {/* Detection Details Drawer */}
        <DetectionDetailsDrawer
          detection={selectedDetection}
          isOpen={!!selectedDetection}
          onClose={() => setSelectedDetection(null)}
        />
      </LeafletMapContainer>
    </div>
  );
}

export default MapContainer;