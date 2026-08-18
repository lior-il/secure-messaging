import { NavFolder, NavSection } from '../models/message.model';

export const PRIMARY_FOLDERS: NavFolder[] = [
  { id: 'inbox', label: 'מברקים נכנסים', icon: 'inbox' },
  { id: 'sent', label: 'מברקים שנשלחו', icon: 'send' },
  { id: 'handled', label: 'מברקים שטופלו', icon: 'check' },
  { id: 'urgent', label: 'מברקים חריגים', icon: 'alert', variant: 'urgent' },
];

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'favorites',
    label: 'מיוחדים',
    icon: 'star',
    items: [
      { id: 'favorites-sent', label: 'מברקים שנשלחו', icon: 'send' },
      { id: 'favorites-handled', label: 'מברקים שטופלו', icon: 'check' },
    ],
  },
  {
    id: 'archive',
    label: 'ארכיון',
    icon: 'archive',
    items: [
      { id: 'archive-sent', label: 'מברקים שנשלחו', icon: 'send' },
      { id: 'archive-handled', label: 'מברקים שטופלו', icon: 'check' },
    ],
  },
];
