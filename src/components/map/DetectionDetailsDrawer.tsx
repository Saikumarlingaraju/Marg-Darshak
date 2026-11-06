import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { X, MapPin, Calendar, AlertTriangle, Info, Truck, CheckCircle } from 'lucide-react';
import { SeverityBadge, StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import type { DetectionFeature } from './types';

interface DetectionDetailsDrawerProps {
  detection: DetectionFeature | null;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const severityIcons = {
  critical: AlertTriangle,
  high: AlertTriangle,
  medium: Info,
  low: Info,
};

const severityColors = {
  critical: 'text-error',
  high: 'text-warning',
  medium: 'text-warning',
  low: 'text-info',
};

const statusColors = {
  pending: 'warning',
  in_progress: 'info',
  resolved: 'success',
  dismissed: 'default',
};

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

function getDetectionTypeLabel(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ');
}

function getRandomImage(): string | null {
  // Simulate image reference - in real app this would come from data
  const images = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400',
    'https://images.unsplash.com/photo-1581092334651-ddaa8c0e0c32?w=400',
  ];
  return images[Math.floor(Math.random() * images.length)];
}

export function DetectionDetailsDrawer({
  detection,
  isOpen,
  onClose,
  className,
}: DetectionDetailsDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus management and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    // Save focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Focus the drawer
    setTimeout(() => {
      drawerRef.current?.focus();
    }, 0);

    // Handle escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      // Trap focus within drawer
      if (event.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Restore focus
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !detection) return null;

  const { properties, geometry } = detection;
  const [lng, lat] = geometry.coordinates;
  const SeverityIcon = severityIcons[properties.severity] || Info;
  const imageUrl = getRandomImage();

  const drawerContent = (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detection-details-title"
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className={cn(
          'relative w-full max-w-md lg:max-w-lg h-full bg-white shadow-2xl animate-slide-in-right',
          'flex flex-col',
          className
        )}
        role="document"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-neutral-100 sticky top-0 bg-white z-10">
          <div>
            <h2
              id="detection-details-title"
              className="text-heading-sm text-neutral-900"
            >
              Detection Details
            </h2>
            <p className="text-body-sm text-neutral-500 mt-0.5">
              {getDetectionTypeLabel(properties.layerType)} • {properties.id}
            </p>
          </div>
          <Tooltip content="Close" position="left">
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </Tooltip>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Severity & Status Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <SeverityBadge severity={properties.severity} size="md" dot />
            <StatusBadge status={properties.status} size="md" />
          </div>

          {/* Image Reference */}
          {imageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100">
              <img
                src={imageUrl}
                alt={`Detection image for ${properties.title}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-body-xs text-white/90 truncate">
                  Reference image • Click to enlarge
                </p>
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="space-y-4">
            {/* Detection ID */}
            <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', severityColors[properties.severity]) + '/10'}>
                <SeverityIcon className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-caption text-neutral-500">Detection ID</p>
                <p className="text-body-sm font-mono text-neutral-900 truncate">{properties.id}</p>
              </div>
            </div>

            {/* Defect Category */}
            <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-caption text-neutral-500">Defect Category</p>
                <p className="text-body-sm font-medium text-neutral-900">{getDetectionTypeLabel(properties.layerType)}</p>
              </div>
            </div>

            {/* Severity with description */}
            <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', severityColors[properties.severity]) + '/10'}>
                <SeverityIcon className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-caption text-neutral-500">Severity</p>
                <p className="text-body-sm font-medium text-neutral-900 capitalize">{properties.severity}</p>
                <p className="text-caption text-neutral-500 mt-1">
                  {properties.severity === 'critical' && 'Immediate attention required'}
                  {properties.severity === 'high' && 'High priority - address soon'}
                  {properties.severity === 'medium' && 'Standard priority'}
                  {properties.severity === 'low' && 'Low priority - monitor'}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-success-bg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-success" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-caption text-neutral-500">Location</p>
                <p className="text-body-sm font-mono text-neutral-900">
                  {lat.toFixed(6)}°, {lng.toFixed(6)}°
                </p>
                <p className="text-caption text-neutral-500 mt-1">
                  {properties.title}
                </p>
              </div>
            </div>

            {/* Detection Timestamp */}
            <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-info-bg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-info" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-caption text-neutral-500">Detected On</p>
                <p className="text-body-sm font-medium text-neutral-900">{formatDate(properties.detectedAt)}</p>
              </div>
            </div>

            {/* Road/Area Information */}
            <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-warning-bg flex items-center justify-center flex-shrink-0">
                <Truck className="w-4 h-4 text-warning" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-caption text-neutral-500">Road / Area</p>
                <p className="text-body-sm text-neutral-900">{properties.title}</p>
              </div>
            </div>

            {/* Maintenance Status */}
            <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', `bg-${statusColors[properties.status]}-bg`)}>
                <CheckCircle className={cn('w-4 h-4', `text-${statusColors[properties.status]}`)} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-caption text-neutral-500">Maintenance Status</p>
                <StatusBadge status={properties.status} size="sm" />
                <p className="text-caption text-neutral-500 mt-1">
                  {properties.status === 'pending' && 'Awaiting assignment'}
                  {properties.status === 'in_progress' && 'Work in progress'}
                  {properties.status === 'resolved' && 'Issue resolved'}
                  {properties.status === 'dismissed' && 'Dismissed / Not actionable'}
                </p>
              </div>
            </div>

            {/* Layer Info */}
            <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-neutral-200 flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-neutral-500" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-caption text-neutral-500">Source Layer</p>
                <p className="text-body-sm text-neutral-900 capitalize">{properties.layerType.replace('-', ' ')}</p>
                <p className="text-caption text-neutral-500 mt-1">Layer ID: {properties.layerId}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
            <Button variant="primary" className="w-full" size="md">
              View on Map
            </Button>
            <Button variant="outline" className="w-full" size="md">
              Create Work Order
            </Button>
            <Button variant="ghost" className="w-full" size="md">
              Share Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof window === 'undefined') return null;

  return createPortal(drawerContent, document.body);
}