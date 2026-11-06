import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import type { KPICardData } from '@/lib/api';

interface KPICardProps {
  data: KPICardData;
  className?: string;
}

export function KPICard({ data, className }: KPICardProps) {
  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-neutral-500',
  };

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  };

  const TrendIcon = trendIcons[data.trendType || 'neutral'] || Minus;

  const bgColors = {
    primary: 'bg-primary/5 border-primary/10',
    error: 'bg-error-bg border-error/20',
    success: 'bg-success-bg border-success/20',
  };

  return (
    <Card variant="outlined" padding="md" className={cn(bgColors[data.color], className)}>
      <CardContent className="p-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-caption text-neutral-500 mb-2">{data.label}</p>
            <p className="text-metric-value text-neutral-900 truncate">{data.value}</p>
            {data.trend && (
              <div className="flex items-center gap-1.5 mt-3">
                <TrendIcon
                  className={cn('w-3.5 h-3.5 flex-shrink-0', trendColors[data.trendType || 'neutral'])}
                  aria-hidden="true"
                />
                <span className={cn('text-metric-trend', trendColors[data.trendType || 'neutral'])}>{data.trend}</span>
              </div>
            )}
          </div>
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
              data.color === 'primary' && 'bg-primary/10',
              data.color === 'error' && 'bg-error-bg',
              data.color === 'success' && 'bg-success-bg'
            )}
            aria-hidden="true"
          >
            <div
              className={cn(
                'w-6 h-6 rounded-lg',
                data.color === 'primary' && 'bg-primary',
                data.color === 'error' && 'bg-error',
                data.color === 'success' && 'bg-success'
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface KPICardSkeletonProps {
  className?: string;
}

export function KPICardSkeleton({ className }: KPICardSkeletonProps) {
  return (
    <Card variant="outlined" padding="md" className={className}>
      <CardContent className="p-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="h-3 w-3/4 bg-neutral-200 rounded animate-pulse mb-2" />
            <div className="h-8 w-1/2 bg-neutral-200 rounded animate-pulse mb-3" />
            <div className="h-3 w-1/3 bg-neutral-200 rounded animate-pulse" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-neutral-200 animate-pulse flex-shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
}
