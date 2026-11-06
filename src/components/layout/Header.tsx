import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, User, Settings, HelpCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dropdown } from '@/components/ui/Dropdown';
import { Tooltip } from '@/components/ui/Tooltip';
import { useUIStore } from '@/store/uiStore';
import type { DropdownOption } from '@/components/ui/Dropdown';
import type { City } from '@/lib/api';

interface HeaderProps {
  onMenuClick: () => void;
}

const CITIES: City[] = [
  { id: 'bengaluru', name: 'Bengaluru', centerLat: 12.9716, centerLng: 77.5946, zoomLevel: 12, isActive: true },
  { id: 'mumbai', name: 'Mumbai', centerLat: 19.0760, centerLng: 72.8777, zoomLevel: 12, isActive: true },
  { id: 'delhi', name: 'Delhi', centerLat: 28.7041, centerLng: 77.1025, zoomLevel: 12, isActive: true },
];

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const currentWorkspace = location.pathname === '/dashboard/geospatial'
    ? 'Geospatial intelligence'
    : 'Operations overview';
  const { notificationsOpen, setNotificationsOpen, unreadCount, selectedCity, setSelectedCity, searchQuery, setSearchQuery } = useUIStore();
  const [profileOpen, setProfileOpen] = useState(false);

  const cityOptions: DropdownOption[] = CITIES.map((city: City) => ({
    value: city.id,
    label: city.name,
  }));

  const profileOptions: DropdownOption[] = [
    { value: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { value: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { value: 'help', label: 'Help & Support', icon: <HelpCircle className="w-4 h-4" /> },
    { value: 'logout', label: 'Log out', icon: <LogOut className="w-4 h-4" /> },
  ];

  const handleProfileSelect = (value: string) => {
    setProfileOpen(false);
    switch (value) {
      case 'logout':
        // Handle logout
        break;
      case 'settings':
        // Navigate to settings
        break;
      case 'help':
        // Navigate to help
        break;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[40] h-[70px] bg-white border-b border-neutral-200">
      <div className="h-full px-[28px] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            <span className="block w-5 space-y-1">
              <span className="block h-px bg-current" />
              <span className="block h-px bg-current" />
              <span className="block h-px bg-current" />
            </span>
          </button>
          <div className="hidden sm:flex items-center gap-[10px] text-body-base whitespace-nowrap">
            <span className="text-neutral-600">Workspace</span>
            <span className="text-neutral-400">/</span>
            <span className="font-semibold text-primary">{currentWorkspace}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-[22px] flex-shrink-0">
          <Tooltip content="Select city" position="bottom">
            <Dropdown
              options={cityOptions}
              value={selectedCity.id}
              onChange={(id) => {
                const city = CITIES.find((c: City) => c.id === id);
                if (city) setSelectedCity(city);
              }}
              placeholder="Select city"
              className="w-[150px]"
            />
          </Tooltip>

          <div className="hidden md:block relative w-40">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-body-sm"
              aria-label="Search"
            />
          </div>

          <Tooltip content={`${unreadCount} unread notifications`} position="bottom">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={cn(
                'relative p-2 rounded-lg transition-colors',
                'hover:bg-neutral-100',
                'focus:outline-none focus:ring-2 focus:ring-primary/50',
                notificationsOpen && 'bg-neutral-100 text-primary'
              )}
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell className={cn('w-5 h-5', notificationsOpen ? 'text-primary' : 'text-neutral-500')} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-caption-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </Tooltip>

          <span className="hidden xl:inline text-caption font-semibold text-success whitespace-nowrap">
            LIVE WORKSPACE
          </span>

          <Tooltip content="User menu" position="bottom">
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="User menu"
                aria-expanded={profileOpen}
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-body-sm font-medium text-primary">JD</span>
                </div>
                <span className="hidden xl:block text-body-sm font-medium text-neutral-700">John Doe</span>
                <ChevronDown className="w-4 h-4 text-neutral-400" />
              </button>

              {profileOpen && (
                <Dropdown
                  options={profileOptions}
                  onChange={handleProfileSelect}
                  className="absolute right-0 mt-2 w-48"
                />
              )}
            </div>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}