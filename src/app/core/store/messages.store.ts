import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, delay } from 'rxjs';
import { FolderId, TelegramMessage, Urgency } from '../models/message.model';
import { MOCK_MESSAGES } from '../data/mock-messages';

interface MessagesState {
  messages: TelegramMessage[];
  selectedFolder: FolderId;
  searchQuery: string;
  viewMode: 'table' | 'grid';
  loading: boolean;
  isComposeOpen: boolean;
}

const initialState: MessagesState = {
  messages: [],
  selectedFolder: 'inbox',
  searchQuery: '',
  viewMode: 'table',
  loading: false,
  isComposeOpen: false,
};

export interface NewTelegramDraft {
  subject: string;
  classification: string;
  urgency: Urgency;
}

function formatSentDate(date: Date): string {
  const pad = (value: number) => value.toString().padStart(2, '0');
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function nextTelegramNumber(messages: TelegramMessage[]): string {
  const year = new Date().getFullYear();
  const maxSequence = messages
    .map((message) => Number(message.number.split('/')[0]))
    .filter((value) => !Number.isNaN(value))
    .reduce((max, value) => Math.max(max, value), 0);
  return `${maxSequence + 1}/${year}`;
}

export const MessagesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ messages, selectedFolder, searchQuery }) => ({
    filteredMessages: computed(() => {
      const folder = selectedFolder();
      const query = searchQuery().trim().toLowerCase();
      return messages()
        .filter((message) => message.folder === folder)
        .filter((message) =>
          !query ||
          [message.subject, message.sender, message.number, message.classification].some((field) =>
            field.toLowerCase().includes(query)
          )
        );
    }),
    inboxUnreadCount: computed(
      () => messages().filter((message) => message.folder === 'inbox' && message.unread).length
    ),
  })),
  withMethods((store) => ({
    selectFolder(folder: FolderId): void {
      patchState(store, { selectedFolder: folder });
    },
    setSearchQuery(query: string): void {
      patchState(store, { searchQuery: query });
    },
    setViewMode(mode: 'table' | 'grid'): void {
      patchState(store, { viewMode: mode });
    },
    toggleFlag(id: string): void {
      patchState(store, {
        messages: store.messages().map((message) =>
          message.id === id ? { ...message, flagged: !message.flagged } : message
        ),
      });
    },
    openCompose(): void {
      patchState(store, { isComposeOpen: true });
    },
    closeCompose(): void {
      patchState(store, { isComposeOpen: false });
    },
    sendMessage(draft: NewTelegramDraft): void {
      const newMessage: TelegramMessage = {
        id: crypto.randomUUID(),
        folder: 'sent',
        unread: false,
        number: nextTelegramNumber(store.messages()),
        classification: draft.classification,
        subject: draft.subject.trim(),
        sender: 'מני פרץ',
        urgency: draft.urgency,
        sentDate: formatSentDate(new Date()),
        attachments: [],
        flagged: false,
      };
      patchState(store, {
        messages: [newMessage, ...store.messages()],
        selectedFolder: 'sent',
        isComposeOpen: false,
      });
    },
    loadMessages: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        delay(150),
        tap(() => patchState(store, { messages: MOCK_MESSAGES, loading: false }))
      )
    ),
  }))
);
