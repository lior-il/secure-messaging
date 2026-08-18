import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { MessagesStore } from '../../core/store/messages.store';
import { Urgency } from '../../core/models/message.model';

const CLASSIFICATIONS = ['בלמ"ס', 'שמור', 'סודי', 'סודי ביותר'];
const URGENCY_LEVELS: Urgency[] = ['רגיל', 'דחוף', 'מיידי'];

@Component({
  selector: 'app-compose-dialog',
  imports: [IconComponent],
  templateUrl: './compose-dialog.component.html',
  styleUrl: './compose-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposeDialogComponent {
  private readonly store = inject(MessagesStore);

  protected readonly classifications = CLASSIFICATIONS;
  protected readonly urgencyLevels = URGENCY_LEVELS;

  protected readonly subject = signal('');
  protected readonly classification = signal(CLASSIFICATIONS[0]);
  protected readonly urgency = signal<Urgency>('רגיל');

  protected readonly canSubmit = computed(() => this.subject().trim().length > 0);

  setSubject(value: string): void {
    this.subject.set(value);
  }

  setClassification(value: string): void {
    this.classification.set(value);
  }

  setUrgency(value: string): void {
    this.urgency.set(value as Urgency);
  }

  submit(): void {
    if (!this.canSubmit()) {
      return;
    }
    this.store.sendMessage({
      subject: this.subject(),
      classification: this.classification(),
      urgency: this.urgency(),
    });
    this.reset();
  }

  close(): void {
    this.store.closeCompose();
    this.reset();
  }

  private reset(): void {
    this.subject.set('');
    this.classification.set(CLASSIFICATIONS[0]);
    this.urgency.set('רגיל');
  }
}
