import { Marker } from 'react-leaflet';
import { useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import type { DetectionFeature } from './types';

// Severity color mapping using design system colors
const severityColors = {
  critical: '#d94e50', // error red
  high: '#d68b17',     // warning orange
  medium: '#d9b800',   // warning yellow
  low: '#246beb',      // primary blue
} as const;

// Detection type icons (using Lucide-like SVGs)
const typeIcons: Record<string, string> = {
  pothole: '🕳️',
  streetlight: '💡',
  drainage: '🌊',
  footpath: '🚶',
  signage: '🪧',
  'road-marking': '🛣️',
  manhole: '🔲',
  vegetation: '🌿',
};

interface DetectionMarkerProps {
  detection: DetectionFeature;
  onClick?: (detection: DetectionFeature) => void;
  isSelected?: boolean;
}

export function DetectionMarker({ detection, onClick, isSelected = false }: DetectionMarkerProps) {
  const { properties, geometry } = detection;
  const [lng, lat] = geometry.coordinates;
  const severity = properties.severity;
  const layerType = properties.layerType;
  const color = severityColors[severity] || severityColors.medium;
  const icon = typeIcons[layerType] || '📍';

  // Create custom DivIcon
  const iconElement = useMemo(() => {
    return L.divIcon({
      className: 'custom-detection-marker',
      html: `
        <div class="marker-wrapper" style="
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translate(-50%, -100%);
        ">
          <div class="marker-icon" style="
            width: 36px;
            height: 36px;
            border-radius: 50% 50% 50% 0;
            background: ${color};
            border: 3px solid white;
            box-shadow: ${isSelected ? '0 0 0 4px rgba(36,107,235,0.35), 0 4px 16px rgba(0,0,0,0.45)' : '0 2px 8px rgba(0,0,0,0.3)'};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transform: rotate(-45deg);
            cursor: pointer;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
          ">
            <span style="transform: rotate(45deg); display: block;">${icon}</span>
          </div>
          <div class="marker-pulse" style="
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: ${color};
            opacity: 0.6;
            animation: pulse 2s infinite;
          "></div>
        </div>
        <style>
          @keyframes pulse {
            0% { transform: translateX(-50%) scale(1); opacity: 0.6; }
            50% { transform: translateX(-50%) scale(1.5); opacity: 0.2; }
            100% { transform: translateX(-50%) scale(1); opacity: 0.6; }
          }
        </style>
      `,
      iconSize: [36, 42],
      iconAnchor: [18, 42],
      popupAnchor: [0, -36],
    });
  }, [color, icon, isSelected]);

  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (markerRef.current && onClick) {
      markerRef.current.on('click', () => onClick(detection));
      // Add hover effect
      const iconEl = markerRef.current.getElement();
      if (iconEl) {
        const markerIcon = iconEl.querySelector('.marker-icon') as HTMLElement;
        if (markerIcon) {
          const handleMouseEnter = () => {
            markerIcon.style.transform = 'rotate(-45deg) scale(1.15)';
            markerIcon.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4)';
          };
          const handleMouseLeave = () => {
            markerIcon.style.transform = 'rotate(-45deg) scale(1)';
            markerIcon.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
          };
          iconEl.addEventListener('mouseenter', handleMouseEnter);
          iconEl.addEventListener('mouseleave', handleMouseLeave);
          return () => {
            iconEl.removeEventListener('mouseenter', handleMouseEnter);
            iconEl.removeEventListener('mouseleave', handleMouseLeave);
          };
        }
      }
    }
  }, [detection, onClick]);

  return (
    <Marker
      position={[lat, lng]}
      ref={markerRef as React.RefObject<L.Marker>}
      icon={iconElement}
      title={properties.title}
      riseOnHover={true}
      riseOffset={500}
      eventHandlers={{ click: () => onClick?.(detection) }}
    />
  );
}