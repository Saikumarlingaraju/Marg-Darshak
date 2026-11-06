import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
      success: 'bg-success-bg text-success border border-success/20',
      warning: 'bg-warning-bg text-warning border border-warning/20',
      error: 'bg-error-bg text-error border border-error/20',
      info: 'bg-info-bg text-info border border-info/20',
      outline: 'bg-transparent text-neutral-600 border border-neutral-300',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-caption',
      md: 'px-2.5 py-1 text-body-xs',
      lg: 'px-3 py-1 text-body-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium rounded-md',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full flex-shrink-0',
              variant === 'success' && 'bg-success',
              variant === 'warning' && 'bg-warning',
              variant === 'error' && 'bg-error',
              variant === 'info' && 'bg-info',
              variant === 'default' && 'bg-neutral-400',
              variant === 'outline' && 'bg-neutral-400'
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * Severity badge - specialized for issue severity
 */
export interface SeverityBadgeProps extends Omit<BadgeProps, 'variant'> {
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export const SeverityBadge = forwardRef<HTMLSpanElement, SeverityBadgeProps>(
  ({ className, severity, size = 'md', children, ...props }, ref) => {
    const severityConfig = {
      critical: { variant: 'error' as const, label: 'Critical', dot: true },
      high: { variant: 'error' as const, label: 'High', dot: true },
      medium: { variant: 'warning' as const, label: 'Medium', dot: true },
      low: { variant: 'info' as const, label: 'Low', dot: true },
    };

    const config = severityConfig[severity];

    return (
      <Badge
        ref={ref}
        variant={config.variant}
        size={size}
        dot={config.dot}
        className={className}
        {...props}
      >
        {children || config.label}
      </Badge>
    );
  }
);

SeverityBadge.displayName = 'SeverityBadge';

/**
 * Status badge - specialized for issue status
 */
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'pending' | 'in_progress' | 'resolved' | 'dismissed';
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, size = 'md', children, ...props }, ref) => {
    const statusConfig = {
      pending: { variant: 'warning' as const, label: 'Pending' },
      in_progress: { variant: 'info' as const, label: 'In Progress' },
      resolved: { variant: 'success' as const, label: 'Resolved' },
      dismissed: { variant: 'default' as const, label: 'Dismissed' },
    };

    const config = statusConfig[status];

    return (
      <Badge
        ref={ref}
        variant={config.variant}
        size={size}
        className={className}
        {...props}
      >
        {children || config.label}
      </Badge>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';