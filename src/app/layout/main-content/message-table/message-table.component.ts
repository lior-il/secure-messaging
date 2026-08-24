import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { IconComponent } from '../../../shared/icon/icon.component';
import { MessagesStore } from '../../../core/store/messages.store';
import { TelegramMessage, Urgency } from '../../../core/models/message.model';

@Component({
  selector: 'app-message-table',
  imports: [IconComponent],
  templateUrl: './message-table.component.html',
  styleUrl: './message-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageTableComponent {
  protected readonly store = inject(MessagesStore);

  protected readonly urgencyClass: Record<Urgency, string> = {
    בהול: 'urgent',
    מיידי: 'urgent',
    דחוף: 'high',
    רגיל: 'normal',
  };

  private readonly openAttachmentsId = signal<string | null>(null);
  protected readonly isAttachmentsOpen = (id: string) => this.openAttachmentsId() === id;

  toggleFlag(message: TelegramMessage): void {
    this.store.toggleFlag(message.id);
  }

  toggleAttachments(message: TelegramMessage): void {
    this.openAttachmentsId.set(this.openAttachmentsId() === message.id ? null : message.id);
  }
}
