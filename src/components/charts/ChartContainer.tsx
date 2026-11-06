import { cn } from '@/lib/utils';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function ChartContainer({ 
  title, 
  subtitle, 
  children, 
  className, 
  action 
}: ChartContainerProps) {
  return (
    <div className={cn('bg-white rounded-2xl border border-neutral-200 shadow-card', className)}>
      <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
        <div>
          <h3 className="text-heading-sm text-neutral-900">{title}</h3>
          {subtitle && (
            <p className="text-body-xs text-neutral-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
