export interface DetectionProperties {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  detectedAt: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'dismissed';
  layerType: string;
  layerId: string;
  urbanBlock?: string;
}

export interface DetectionFeature {
  type: 'Feature';
  id: string;
  properties: DetectionProperties;
  geometry: GeoJSON.Point;
}

export interface UrbanBlockFeature {
  type: 'Feature';
  id: string;
  properties: {
    id: string;
    name: string;
    fillColor?: string;
    borderColor?: string;
  };
  geometry: GeoJSON.Polygon;
}

export interface LayerVisibility {
  urbanBlocks: boolean;
  roadNetwork: boolean;
  detectionMarkers: boolean;
}

export interface MapFilters {
  severity: Array<'critical' | 'high' | 'medium' | 'low'>;
  detectionTypes: string[];
  urbanBlocks: string[];
}

export interface MapLayerData {
  layers: Array<{
    id: string;
    type: string;
    geojson: GeoJSON.FeatureCollection;
    style: Record<string, unknown>;
    visible: boolean;
  }>;
}