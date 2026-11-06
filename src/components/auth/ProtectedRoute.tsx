import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useUIStore } from '@/store/uiStore';

/**
 * Protected Route Wrapper
 * Checks authentication status and redirects to login if not authenticated
 * For now, allows all access (auth check to be implemented later)
 */
export function ProtectedRoute() {
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  // TODO: Replace with actual auth check
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true; // Placeholder - allow all for now

  if (!isAuthenticated) {
    // Redirect to login with the current location as redirect target
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Close sidebar on route change for mobile
  if (sidebarOpen) {
    setSidebarOpen(false);
  }

  return <Outlet />;
}

/**
 * Public Route Wrapper
 * For routes that should only be accessible when NOT authenticated (e.g., login)
 * Redirects to dashboard if already authenticated
 */
export function PublicRoute() {
  // TODO: Replace with actual auth check
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = false; // Placeholder - not authenticated for now

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
