import { DetectionMarker } from './DetectionMarker';
import type { DetectionFeature } from './types';

interface DetectionMarkersLayerProps {
  detections: DetectionFeature[];
  onDetectionClick?: (detection: DetectionFeature) => void;
}

export function DetectionMarkersLayer({
  detections,
  onDetectionClick,
}: DetectionMarkersLayerProps) {
  return (
    <>
      {detections.map((detection) => (
        <DetectionMarker
          key={detection.id}
          detection={detection}
          onClick={onDetectionClick}
        />
      ))}
    </>
  );
}