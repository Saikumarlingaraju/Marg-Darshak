import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { KPICard, KPICardSkeleton } from './KPICard';
import { api, queryKeys } from '@/lib/api';

interface KPISectionProps {
  className?: string;
}

export function KPISection({ className }: KPISectionProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.kpis,
    queryFn: () => api.getKPIs(),
    staleTime: 30000,
  });

  const kpis = data?.data || [];

  if (error) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-body-sm text-error">Failed to load KPIs</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {isLoading
        ? [...Array(4)].map((_, i) => <KPICardSkeleton key={i} />)
        : kpis.map((kpi) => <KPICard key={kpi.id} data={kpi} />)}
    </div>
  );
}
