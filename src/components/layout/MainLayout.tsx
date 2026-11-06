import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';

interface MainLayoutProps {}

export function MainLayout(_props: MainLayoutProps) {
  const { sidebarOpen, setSidebarOpen, isMobile } = useUIStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleSidebarClose = () => {
    setMobileSidebarOpen(false);
    if (isMobile) setSidebarOpen(false);
  };

  const sidebarWidth = useUIStore.getState().sidebarCollapsed ? 64 : 256;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <Header onMenuClick={handleMenuClick} />

      <div className="pt-[70px] min-h-[calc(100vh-70px)]">
        {/* Mobile Sidebar Overlay */}
        {isMobile && mobileSidebarOpen && (
          <div
            className="fixed top-[70px] left-0 right-0 bottom-0 z-[30] bg-black/50 lg:hidden"
            onClick={handleSidebarClose}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <Sidebar onClose={handleSidebarClose} />

        {/* Main Content */}
        <main
          className={cn(
            'transition-all duration-300 ease-out min-h-[calc(100vh-70px)]',
            'bg-neutral-50',
            isMobile ? 'ml-0' : ''
          )}
          style={!isMobile ? { marginLeft: sidebarWidth } : undefined}
          role="main"
          aria-label="Main content"
        >
          <div className="p-[25px] px-[28px] pb-[24px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
