/**
 * Navigation constants for Marg-Darshak Dashboard
 * @packageDocumentation
 */

import type { City } from '@/lib/api';

/**
 * Sidebar navigation items
 * @mock
 */
export const MOCK_NAV_ITEMS = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'home',
    href: '/',
    badge: null,
  },
  {
    id: 'map',
    label: 'Map View',
    icon: 'map',
    href: '/map',
    badge: null,
  },
  {
    id: 'inspections',
    label: 'Inspections',
    icon: 'clipboard-list',
    href: '/inspections',
    badge: '12',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'bar-chart-2',
    href: '/analytics',
    badge: null,
  },
  {
    id: 'alerts',
    label: 'Alerts',
    icon: 'bell',
    href: '/alerts',
    badge: '5',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    href: '/settings',
    badge: null,
  },
] as const;

export type NavItemId = (typeof MOCK_NAV_ITEMS)[number]['id'];

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge: string | null;
}

/**
 * City configuration with correct coordinates for Indian cities
 * Bengaluru (default), Mumbai, Delhi
 * @mock
 */
export const MOCK_CITIES: City[] = [
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    centerLat: 12.9716,
    centerLng: 77.5946,
    zoomLevel: 11,
    isActive: true,
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    centerLat: 19.0760,
    centerLng: 72.8777,
    zoomLevel: 11,
    isActive: false,
  },
  {
    id: 'delhi',
    name: 'Delhi',
    centerLat: 28.7041,
    centerLng: 77.1025,
    zoomLevel: 11,
    isActive: false,
  },
] as const;

/**
 * Default city (Bengaluru)
 * @mock
 */
export const MOCK_DEFAULT_CITY = MOCK_CITIES[0];

/**
 * App header configuration
 * @mock
 */
export const MOCK_APP_CONFIG = {
  name: 'Marg-Darshak',
  tagline: 'Urban Infrastructure Intelligence',
  logo: 'map-pin',
} as const;

/**
 * User menu items
 * @mock
 */
export const MOCK_USER_MENU_ITEMS = [
  {
    id: 'profile',
    label: 'Profile',
    icon: 'user',
    href: '/profile',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'bell',
    href: '/notifications',
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: 'sliders-horizontal',
    href: '/preferences',
  },
  {
    id: 'logout',
    label: 'Sign Out',
    icon: 'log-out',
    href: '/logout',
    destructive: true,
  },
] as const;