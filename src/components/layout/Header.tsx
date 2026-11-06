import { useState } from 'react';
import { Menu, Bell, Search, ChevronDown, LogOut, User, Settings, HelpCircle } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-[40] h-[70px] bg-white border-b border-neutral-200 shadow-card">
      <div className="h-full px-[28px] flex items-center justify-between gap-4">
        {/* Left: Menu button + Logo + Search */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Tooltip content="Toggle navigation" position="bottom">
            <button
              type="button"
              onClick={onMenuClick}
              className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </Tooltip>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343M12 2a10 10 0 00-9.875 10M12 2a10 10 0 0110 10M12 2a10 10 0 100 20M12 2a10 10 0 110-20" />
              </svg>
            </div>
            <span className="text-heading-sm text-primary font-semibold">Marg-Darshak</span>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search detections, inspections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-body-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-colors"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Right: City selector, Notifications, Profile */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* City Selector */}
          <Tooltip content="Select city" position="bottom">
            <Dropdown
              options={cityOptions}
              value={selectedCity.id}
              onChange={(id) => {
                const city = CITIES.find((c: City) => c.id === id);
                if (city) setSelectedCity(city);
              }}
              placeholder="Select city"
              className="w-40"
            />
          </Tooltip>

          {/* Notifications */}
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

          {/* Profile */}
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
                <span className="hidden sm:block text-body-sm font-medium text-neutral-700">John Doe</span>
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