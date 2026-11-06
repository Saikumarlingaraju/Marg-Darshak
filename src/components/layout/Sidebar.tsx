import { useState } from 'react';
import {
  LayoutDashboard,
  Map,
  List,
  AlertTriangle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  BarChart2,
  FileText,
  Users,
  Layers,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/uiStore';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  badgeColor?: 'error' | 'warning' | 'info' | 'success';
  children?: NavItem[];
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: 'map',
    label: 'Map View',
    icon: <Map className="w-5 h-5" />,
  },
  {
    id: 'inspections',
    label: 'Inspections',
    icon: <List className="w-5 h-5" />,
    badge: 12,
    badgeColor: 'warning',
  },
  {
    id: 'detections',
    label: 'Detections',
    icon: <FileText className="w-5 h-5" />,
    children: [
      { id: 'recent', label: 'Recent Detections', icon: <ArrowUpRight className="w-4 h-4" /> },
      { id: 'analytics', label: 'Analytics', icon: <BarChart2 className="w-4 h-4" /> },
    ],
  },
  {
    id: 'alerts',
    label: 'Alerts',
    icon: <AlertTriangle className="w-5 h-5" />,
    badge: 3,
    badgeColor: 'error',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    children: [
      { id: 'general', label: 'General', icon: <Home className="w-4 h-4" /> },
      { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
      { id: 'layers', label: 'Map Layers', icon: <Layers className="w-4 h-4" /> },
    ],
  },
];

interface SidebarProps {
  onClose: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const { sidebarOpen, sidebarCollapsed, toggleSidebarCollapsed } = useUIStore();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['detections', 'settings']));

  if (!sidebarOpen) return null;

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isExpanded = (id: string) => expandedItems.has(id);

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const expanded = isExpanded(item.id);

    return (
      <div key={item.id} className={level > 0 ? 'pl-2' : ''}>
        {hasChildren ? (
          <button
            type="button"
            onClick={() => toggleItem(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg',
              'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              sidebarCollapsed && level === 0 && 'justify-center px-2'
            )}
            aria-expanded={expanded}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!sidebarCollapsed && (
              <span className="flex-1 text-body-sm font-medium truncate">{item.label}</span>
            )}
            {!sidebarCollapsed && (
              <>
                {item.badge && (
                  <span
                    className={cn(
                      'px-1.5 py-0.5 text-caption-xs font-medium rounded-full flex-shrink-0',
                      item.badgeColor === 'error' && 'bg-error-bg text-error',
                      item.badgeColor === 'warning' && 'bg-warning-bg text-warning',
                      item.badgeColor === 'info' && 'bg-info-bg text-info',
                      item.badgeColor === 'success' && 'bg-success-bg text-success'
                    )}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform',
                    expanded && 'rotate-180'
                  )}
                />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg',
              'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              sidebarCollapsed && level === 0 && 'justify-center px-2'
            )}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!sidebarCollapsed && (
              <span className="flex-1 text-body-sm font-medium truncate">{item.label}</span>
            )}
            {!sidebarCollapsed && item.badge && (
              <span
                className={cn(
                  'px-1.5 py-0.5 text-caption-xs font-medium rounded-full flex-shrink-0',
                  item.badgeColor === 'error' && 'bg-error-bg text-error',
                  item.badgeColor === 'warning' && 'bg-warning-bg text-warning',
                  item.badgeColor === 'info' && 'bg-info-bg text-info',
                  item.badgeColor === 'success' && 'bg-success-bg text-success'
                )}
              >
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}
          </button>
        )}

        {hasChildren && expanded && !sidebarCollapsed && (
          <div className="mt-1 space-y-1" role="group" aria-label={`${item.label} submenu`}>
            {item.children!.map((child) => (
              <button
                key={child.id}
                type="button"
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-1.5 rounded-md',
                  'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100',
                  'text-body-sm transition-colors duration-150',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
              >
                <span className="flex-shrink-0">{child.icon}</span>
                <span className="truncate">{child.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        'fixed top-[70px] left-0 bottom-0 z-[35] bg-white border-r border-neutral-200',
        'transition-all duration-300 ease-out',
        'flex flex-col',
        sidebarCollapsed ? 'w-16' : 'w-64',
        !sidebarOpen && 'hidden'
      )}
      aria-label="Main navigation"
    >
      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto scrollbar-thin" role="navigation" aria-label="Main">
        <ul className="space-y-1" role="list">
          {NAV_ITEMS.map((item) => renderNavItem(item))}
        </ul>
      </nav>

      {/* Collapse/Expand Toggle */}
      <div className="p-3 border-t border-neutral-100">
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          onClick={toggleSidebarCollapsed}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="justify-center"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>

      {/* Mobile Close Button */}
      <div className="p-3 border-t border-neutral-100 lg:hidden">
        <Button variant="outline" size="sm" fullWidth onClick={onClose}>
          Close Menu
        </Button>
      </div>
    </aside>
  );
}