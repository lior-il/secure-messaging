import { IconName } from '../../shared/icon/icon.component';

export type Urgency = 'מיידי' | 'דחוף' | 'רגיל';

export type FolderId =
  | 'inbox'
  | 'sent'
  | 'handled'
  | 'urgent'
  | 'favorites-sent'
  | 'favorites-handled'
  | 'archive-sent'
  | 'archive-handled';

export interface AttachmentFile {
  name: string;
  size: string;
}

export interface TelegramMessage {
  id: string;
  folder: FolderId;
  unread: boolean;
  number: string;
  classification: string;
  subject: string;
  sender: string;
  urgency: Urgency;
  sentDate: string;
  attachments: AttachmentFile[];
  flagged: boolean;
}

export interface NavFolder {
  id: FolderId;
  label: string;
  icon: IconName;
  count?: number;
  variant?: 'default' | 'urgent';
}

export interface NavSection {
  id: string;
  label: string;
  icon: IconName;
  items: NavFolder[];
}
