import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Providers } from '@/store/providers';
import { MainLayout } from '@/components/layout/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Analytics from '@/pages/Analytics';
import Infrastructure from '@/pages/Infrastructure';
import Alerts from '@/pages/Alerts';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // TODO: Add actual auth check when Catalyst Auth is integrated
  // For now, allow all routes
  return <>{children}</>;
}

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/analytics" element={<Analytics />} />
              <Route path="dashboard/infrastructure" element={<Infrastructure />} />
              <Route path="dashboard/alerts" element={<Alerts />} />
              <Route path="dashboard/reports" element={<Reports />} />
              <Route path="dashboard/settings" element={<Settings />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
