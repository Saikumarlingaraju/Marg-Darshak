import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useMemo, useEffect } from 'react';
import { queryClient as defaultQueryClient } from '@/lib/api';
import { useUIStore } from './uiStore';
import { useDashboardStore } from './dashboardStore';

/**
 * Providers Wrapper
 * Sets up QueryClient, initializes stores, and handles auth
 */

interface ProvidersProps {
  children: ReactNode;
  initialQueryClient?: QueryClient;
}

export function Providers({ children, initialQueryClient }: ProvidersProps) {
  const queryClient = useMemo(
    () => initialQueryClient || defaultQueryClient,
    [initialQueryClient]
  );

  // Initialize UI store
  const { setIsMobile } = useUIStore();

  // Initialize dashboard store
  useDashboardStore();

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // TODO: Open search modal
      }
      // Escape to close modals/sidebars
      if (e.key === 'Escape') {
        // Close notifications, modals, etc.
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}