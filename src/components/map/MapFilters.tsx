import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';
import { Badge } from '@/components/ui/Badge';
import { Dropdown } from '@/components/ui/Dropdown';
import type { DropdownOption } from '@/components/ui/Dropdown';
import type { MapFilters } from './types';

const severityOptions: Array<{ value: 'critical' | 'high' | 'medium' | 'low'; label: string; color: string }> = [
  { value: 'critical', label: 'Critical', color: '#d94e50' },
  { value: 'high', label: 'High', color: '#d68b17' },
  { value: 'medium', label: 'Medium', color: '#d9b800' },
  { value: 'low', label: 'Low', color: '#246beb' },
];
const statusOptions: Array<{ value: MapFilters['statuses'][number]; label: string }> = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'dismissed', label: 'Dismissed' },
];

interface MapFiltersProps {
  filters: MapFilters;
  onChange: (filters: MapFilters) => void;
  availableTypes: string[];
  availableBlocks: Array<{ id: string; name: string }>;
  className?: string;
}

export function MapFilters({
  filters,
  onChange,
  availableTypes,
  availableBlocks,
  className,
}: MapFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Dropdowns handle their own closing
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters =
    filters.severity.length !== 4 ||
    filters.detectionTypes.length > 0 ||
    filters.statuses.length !== 4 ||
    filters.urbanBlocks.length > 0;

  const severityDropdownOptions: DropdownOption[] = severityOptions.map((s) => ({
    value: s.value,
    label: `${s.label}`,
  }));

  const typeDropdownOptions: DropdownOption[] = availableTypes.map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' '),
  }));

  const blockDropdownOptions: DropdownOption[] = availableBlocks.map((block) => ({
    value: block.id,
    label: block.name,
  }));

  const handleSeverityChange = (selected: string) => {
    const types = selected.split(',').filter(Boolean);
    onChange({ ...filters, severity: types as MapFilters['severity'] });
  };

  const handleTypesChange = (selected: string) => {
    const types = selected.split(',').filter(Boolean);
    onChange({ ...filters, detectionTypes: types });
  };

  const handleStatusChange = (selected: string) => {
    onChange({ ...filters, statuses: selected.split(',').filter(Boolean) as MapFilters['statuses'] });
  };

  const handleBlocksChange = (selected: string) => {
    const blocks = selected.split(',').filter(Boolean);
    onChange({ ...filters, urbanBlocks: blocks });
  };

  const clearAllFilters = () => {
    onChange({
      severity: ['critical', 'high', 'medium', 'low'],
      detectionTypes: [],
      statuses: ['pending', 'in_progress', 'resolved', 'dismissed'],
      urbanBlocks: [],
    });
  };

  return (
    <div
      ref={dropdownRef}
      className={cn(
        'absolute top-4 right-4 z-[1000]',
        className
      )}
    >
      <Tooltip content={isExpanded ? 'Collapse filters' : 'Expand filters'} position="left">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'p-2 rounded-lg bg-white shadow-dropdown border border-neutral-200',
            'transition-all duration-200',
            'hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary/50',
            hasActiveFilters && 'border-primary/50 bg-primary/5',
            isExpanded ? 'w-auto' : 'w-10'
          )}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
        >
          <Filter className={cn(
            'w-5 h-5 flex-shrink-0',
            hasActiveFilters ? 'text-primary' : 'text-neutral-500'
          )} aria-hidden="true" />
          {isExpanded && (
            <span className="ml-2 text-body-sm font-medium text-neutral-900 whitespace-nowrap">
              Filters
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
        <div className="mt-2 w-64 bg-white rounded-lg shadow-dropdown border border-neutral-200 p-3 animate-slide-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-body-sm font-semibold text-neutral-900">Filters</h3>
            <div className="flex items-center gap-1">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-caption text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" aria-hidden="true" />
                  Clear all
                </button>
              )}
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 text-neutral-400 hover:text-neutral-600 rounded transition-colors"
                aria-label="Close filters"
              >
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="space-y-3" role="group" aria-label="Map filters">
            {/* Severity Filter */}
            <div>
              <label
                htmlFor="severity-filter"
                className="block text-caption font-medium text-neutral-700 mb-1.5"
              >
                Severity
                <span className="text-neutral-400 ml-1">
                  ({filters.severity.length}/4)
                </span>
              </label>
              <Dropdown
                options={severityDropdownOptions}
                value={filters.severity.join(',')}
                placeholder="Select severity levels"
                onChange={handleSeverityChange}
                multiSelect={true}
                searchable={false}
              />
            </div>

            {/* Detection Type Filter */}
            {availableTypes.length > 0 && (
              <div>
                <label
                  htmlFor="type-filter"
                  className="block text-caption font-medium text-neutral-700 mb-1.5"
                >
                  Detection Type
                  <span className="text-neutral-400 ml-1">
                    ({filters.detectionTypes.length}/{availableTypes.length})
                  </span>
                </label>
                <Dropdown
                  options={typeDropdownOptions}
                  value={filters.detectionTypes.join(',')}
                  placeholder="Select detection types"
                  onChange={handleTypesChange}
                  multiSelect={true}
                  searchable={true}
                />
              </div>
            )}

            <div>
              <label className="block text-caption font-medium text-neutral-700 mb-1.5">
                Maintenance status
                <span className="text-neutral-400 ml-1">({filters.statuses.length}/4)</span>
              </label>
              <Dropdown
                options={statusOptions}
                value={filters.statuses.join(',')}
                placeholder="Select statuses"
                onChange={handleStatusChange}
                multiSelect={true}
              />
            </div>

            {/* Urban Block Filter */}
            {availableBlocks.length > 0 && (
              <div>
                <label
                  htmlFor="block-filter"
                  className="block text-caption font-medium text-neutral-700 mb-1.5"
                >
                  Urban Block
                  <span className="text-neutral-400 ml-1">
                    ({filters.urbanBlocks.length}/{availableBlocks.length})
                  </span>
                </label>
                <Dropdown
                  options={blockDropdownOptions}
                  value={filters.urbanBlocks.join(',')}
                  placeholder="Select urban blocks"
                  onChange={handleBlocksChange}
                  multiSelect={true}
                  searchable={true}
                />
              </div>
            )}

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="pt-2 border-t border-neutral-100">
                <p className="text-caption font-medium text-neutral-700 mb-2">Active filters:</p>
                <div className="flex flex-wrap gap-1.5">
                  {filters.severity.length < 4 && filters.severity.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {filters.severity.map((s) => {
                        const opt = severityOptions.find((o) => o.value === s);
                        return (
                          <Badge
                            key={s}
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            style={{ borderColor: opt?.color, color: opt?.color }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: opt?.color }}
                            />
                            {opt?.label}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                  {filters.detectionTypes.map((type) => (
                    <Badge key={type} variant="outline" size="sm">
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                    </Badge>
                  ))}
                  {filters.urbanBlocks.map((blockId) => {
                    const block = availableBlocks.find((b) => b.id === blockId);
                    return (
                      <Badge key={blockId} variant="outline" size="sm">
                        {block?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-100">
            <p className="text-caption text-neutral-500 text-center">
              Combine filters to narrow down detections
            </p>
          </div>
        </div>
      )}
    </div>
  );
}