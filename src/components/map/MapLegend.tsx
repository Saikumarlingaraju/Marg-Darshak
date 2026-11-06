import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Square } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';
import { SeverityBadge } from '@/components/ui/Badge';

interface MapLegendProps {
  className?: string;
}

const severityItems = [
  { value: 'critical' as const, label: 'Critical', color: '#d94e50' },
  { value: 'high' as const, label: 'High', color: '#d68b17' },
  { value: 'medium' as const, label: 'Medium', color: '#d9b800' },
  { value: 'low' as const, label: 'Low', color: '#246beb' },
];

const typeIcons: Record<string, { icon: string; color: string; label: string }> = {
  pothole: { icon: '🕳️', color: '#d94e50', label: 'Pothole' },
  streetlight: { icon: '💡', color: '#d68b17', label: 'Streetlight' },
  drainage: { icon: '🌊', color: '#d94e50', label: 'Drainage' },
  footpath: { icon: '🚶', color: '#246beb', label: 'Footpath' },
  signage: { icon: '🪧', color: '#246beb', label: 'Signage' },
  'road-marking': { icon: '🛣️', color: '#246beb', label: 'Road Marking' },
  manhole: { icon: '🔲', color: '#d68b17', label: 'Manhole' },
  vegetation: { icon: '🌿', color: '#16856b', label: 'Vegetation' },
};

const roadStyles = [
  { type: 'highway', label: 'Highway', color: '#dc2626', weight: 3, dash: '10, 5' },
  { type: 'arterial', label: 'Arterial Road', color: '#ea580c', weight: 2.5, dash: '' },
  { type: 'collector', label: 'Collector Road', color: '#d97706', weight: 2, dash: '' },
  { type: 'local', label: 'Local Road', color: '#78716c', weight: 1.5, dash: '' },
];

export function MapLegend({ className }: MapLegendProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeverity, setShowSeverity] = useState(true);
  const [showTypes, setShowTypes] = useState(true);
  const [showRoads, setShowRoads] = useState(true);
  const [showBlocks, setShowBlocks] = useState(true);

  return (
    <div
      className={cn(
        'absolute bottom-4 right-4 z-[1000]',
        className
      )}
    >
      <Tooltip content={isExpanded ? 'Collapse legend' : 'Expand legend'} position="left">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'p-2 rounded-lg bg-white shadow-dropdown border border-neutral-200',
            'transition-all duration-200',
            'hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary/50',
            isExpanded ? 'w-auto' : 'w-10'
          )}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse legend' : 'Expand legend'}
        >
          <Square className="w-5 h-5 text-neutral-700 flex-shrink-0" aria-hidden="true" />
          {isExpanded && (
            <span className="ml-2 text-body-sm font-medium text-neutral-900 whitespace-nowrap">
              Legend
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="ml-auto w-4 h-4 text-neutral-500 flex-shrink-0" aria-hidden="true" />
          ) : (
            <ChevronDown className="ml-auto w-4 h-4 text-neutral-500 flex-shrink-0" aria-hidden="true" />
          )}
        </button>
      </Tooltip>

      {isExpanded && (
        <div className="mt-2 w-72 bg-white rounded-lg shadow-dropdown border border-neutral-200 p-3 animate-slide-in max-h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-body-sm font-semibold text-neutral-900">Map Legend</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 text-neutral-400 hover:text-neutral-600 rounded transition-colors"
              aria-label="Close legend"
            >
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-4" role="group" aria-label="Map legend">

            {/* Severity Legend */}
            <div className="border-b border-neutral-100 pb-3">
              <div className="flex items-center justify-between mb-2">
                <label
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={showSeverity}
                    onChange={(e) => setShowSeverity(e.target.checked)}
                    className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary/50"
                    aria-label="Show severity legend"
                  />
                  <span className="text-caption font-medium text-neutral-700">Severity</span>
                </label>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-neutral-400 transition-transform',
                    !showSeverity && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </div>

              {showSeverity && (
                <div className="space-y-2 ml-6">
                  {severityItems.map(({ value, label, color }) => (
                    <div key={value} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                      <SeverityBadge severity={value} size="sm">
                        {label}
                      </SeverityBadge>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detection Types Legend */}
            <div className="border-b border-neutral-100 pb-3">
              <div className="flex items-center justify-between mb-2">
                <label
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={showTypes}
                    onChange={(e) => setShowTypes(e.target.checked)}
                    className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary/50"
                    aria-label="Show detection types legend"
                  />
                  <span className="text-caption font-medium text-neutral-700">Detection Types</span>
                </label>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-neutral-400 transition-transform',
                    !showTypes && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </div>

              {showTypes && (
                <div className="space-y-2 ml-6">
                  {Object.entries(typeIcons).map(([key, { icon, color, label }]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        {icon}
                      </div>
                      <span className="text-body-sm text-neutral-700">{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Road Network Legend */}
            <div className="border-b border-neutral-100 pb-3">
              <div className="flex items-center justify-between mb-2">
                <label
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={showRoads}
                    onChange={(e) => setShowRoads(e.target.checked)}
                    className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary/50"
                    aria-label="Show road network legend"
                  />
                  <span className="text-caption font-medium text-neutral-700">Road Network</span>
                </label>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-neutral-400 transition-transform',
                    !showRoads && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </div>

              {showRoads && (
                <div className="space-y-2 ml-6">
                  {roadStyles.map(({ type, label, color, weight, dash }) => (
                    <div key={type} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-1 rounded"
                          style={{
                            backgroundColor: color,
                            borderTop: dash ? `2px dashed ${color}` : 'none',
                            height: weight,
                          }}
                        />
                        <span className="text-body-sm text-neutral-700">{label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Urban Blocks Legend */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={showBlocks}
                    onChange={(e) => setShowBlocks(e.target.checked)}
                    className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary/50"
                    aria-label="Show urban blocks legend"
                  />
                  <span className="text-caption font-medium text-neutral-700">Urban Blocks</span>
                </label>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-neutral-400 transition-transform',
                    !showBlocks && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </div>

              {showBlocks && (
                <div className="space-y-2 ml-6">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded">
                      <div
                        className="absolute inset-0 rounded border-2 border-dashed"
                        style={{ borderColor: '#246beb', backgroundColor: 'rgba(36, 107, 235, 0.15)' }}
                      />
                    </div>
                    <span className="text-body-sm text-neutral-700">Ward Boundaries</span>
                  </div>
                  <p className="text-caption text-neutral-500 ml-10">
                    Dashed outline with tinted fill
                  </p>
                </div>
              )}
            </div>

          </div>

          <div className="mt-3 pt-3 border-t border-neutral-100">
            <p className="text-caption text-neutral-500 text-center">
              Toggle sections to customize legend view
            </p>
          </div>
        </div>
      )}
    </div>
  );
}