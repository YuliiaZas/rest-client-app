import { PhosphorIcons } from '@/components/icons';

export type NavigationItem = {
  title: string;
  description?: string;
  icon: PhosphorIcons;
  path: string;
};

export const navigation: NavigationItem[] = [
  {
    title: 'dashboard-title',
    icon: 'house',
    path: '/dashboard',
  },
  {
    title: 'client-title',
    description: 'client-description',
    icon: 'planet',
    path: '/client',
  },
  {
    title: 'history-title',
    description: 'history-description',
    icon: 'history',
    path: '/history',
  },
  {
    title: 'variables-title',
    description: 'variables-description',
    icon: 'stack',
    path: '/variables',
  },
];
