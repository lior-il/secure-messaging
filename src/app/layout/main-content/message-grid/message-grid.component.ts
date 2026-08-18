import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { IconComponent } from '../../../shared/icon/icon.component';
import { MessagesStore } from '../../../core/store/messages.store';
import { TelegramMessage, Urgency } from '../../../core/models/message.model';

@Component({
  selector: 'app-message-grid',
  imports: [IconComponent],
  templateUrl: './message-grid.component.html',
  styleUrl: './message-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageGridComponent {
  protected readonly store = inject(MessagesStore);

  protected readonly urgencyClass: Record<Urgency, string> = {
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
