import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Eye, EyeOff, Map, Layers, Target } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';
import type { LayerVisibility } from './types';

interface LayerControlsProps {
  visibility: LayerVisibility;
  onChange: (visibility: LayerVisibility) => void;
  className?: string;
}

const layerConfig = [
  {
    key: 'urbanBlocks' as keyof LayerVisibility,
    label: 'Urban Blocks',
    icon: Map,
    description: 'Administrative ward boundaries',
  },
  {
    key: 'roadNetwork' as keyof LayerVisibility,
    label: 'Road Network',
    icon: Target,
    description: 'Major roads and highways',
  },
  {
    key: 'detectionMarkers' as keyof LayerVisibility,
    label: 'Detection Markers',
    icon: Layers,
    description: 'Issue detection locations',
  },
];

export function LayerControls({ visibility, onChange, className }: LayerControlsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={cn(
        'absolute top-4 left-4 z-[1000]',
        className
      )}
    >
      <Tooltip content={isExpanded ? 'Collapse layer controls' : 'Expand layer controls'} position="right">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'p-2 rounded-lg bg-white shadow-dropdown border border-neutral-200',
            'transition-all duration-200',
            'hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary/50',
            isExpanded ? 'w-auto' : 'w-10'
          )}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse layer controls' : 'Expand layer controls'}
        >
          <Layers className="w-5 h-5 text-neutral-700 flex-shrink-0" aria-hidden="true" />
          {isExpanded && (
            <span className="ml-2 text-body-sm font-medium text-neutral-900 whitespace-nowrap">
              Map Layers
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
        <div className="mt-2 w-56 bg-white rounded-lg shadow-dropdown border border-neutral-200 p-3 animate-slide-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-body-sm font-semibold text-neutral-900">Layers</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 text-neutral-400 hover:text-neutral-600 rounded transition-colors"
              aria-label="Close layer controls"
            >
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-2" role="group" aria-label="Map layer visibility">
            {layerConfig.map(({ key, label, icon: Icon, description }) => (
              <label
                key={key}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={visibility[key]}
                  onChange={(e) =>
                    onChange({ ...visibility, [key]: e.target.checked })
                  }
                  className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary/50 focus:ring-2 transition-colors"
                  aria-label={label}
                  id={`layer-${key}`}
                />
                <Icon
                  className={cn(
                    'w-4 h-4 flex-shrink-0',
                    visibility[key] ? 'text-primary' : 'text-neutral-400'
                  )}
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <span className={cn(
                    'text-body-sm font-medium truncate block',
                    visibility[key] ? 'text-neutral-900' : 'text-neutral-500'
                  )}>
                    {label}
                  </span>
                  <span className="text-caption text-neutral-400 truncate block">
                    {description}
                  </span>
                </div>
                <Tooltip content={visibility[key] ? 'Hide layer' : 'Show layer'} position="top">
                  <span
                    className={cn(
                      'p-1 rounded transition-colors',
                      visibility[key] ? 'text-primary hover:bg-primary/10' : 'text-neutral-400 hover:bg-neutral-100'
                    )}
                    aria-hidden="true"
                  >
                    {visibility[key] ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </span>
                </Tooltip>
              </label>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-100">
            <p className="text-caption text-neutral-500 text-center">
              Toggle layers to customize your view
            </p>
          </div>
        </div>
      )}
    </div>
  );
}