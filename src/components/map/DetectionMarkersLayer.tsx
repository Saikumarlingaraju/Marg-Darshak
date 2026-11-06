import { DetectionMarker } from './DetectionMarker';
import type { DetectionFeature } from './types';

interface DetectionMarkersLayerProps {
  detections: DetectionFeature[];
  onDetectionClick?: (detection: DetectionFeature) => void;
  selectedDetectionId?: string;
}

export function DetectionMarkersLayer({
  detections,
  onDetectionClick,
  selectedDetectionId,
}: DetectionMarkersLayerProps) {
  return (
    <>
      {detections.map((detection) => (
        <DetectionMarker
          key={detection.id}
          detection={detection}
          onClick={onDetectionClick}
          isSelected={detection.id === selectedDetectionId}
        />
      ))}
    </>
  );
}