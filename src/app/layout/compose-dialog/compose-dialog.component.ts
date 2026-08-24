import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { RecipientPickerComponent } from './recipient-picker/recipient-picker.component';
import { MessagesStore } from '../../core/store/messages.store';
import { AttachmentFile, Urgency } from '../../core/models/message.model';

const CLASSIFICATIONS = ['בלמ"ס', 'רגיל', 'סודי', 'סודי ביותר'];
const URGENCY_LEVELS: Urgency[] = ['רגיל', 'דחוף', 'מיידי', 'בהול'];
const FONT_FAMILIES = ['בררת מחדל', 'Arial', 'Times New Roman', 'Courier New'];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes}B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)}KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

@Component({
  selector: 'app-compose-dialog',
  imports: [IconComponent, RecipientPickerComponent],
  templateUrl: './compose-dialog.component.html',
  styleUrl: './compose-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposeDialogComponent {
  private readonly store = inject(MessagesStore);

  protected readonly classifications = CLASSIFICATIONS;
  protected readonly urgencyLevels = URGENCY_LEVELS;
  protected readonly fontFamilies = FONT_FAMILIES;

  protected readonly subject = signal('');
  protected readonly classification = signal(CLASSIFICATIONS[0]);
  protected readonly urgency = signal<Urgency>('רגיל');
  protected readonly recipientA = signal('');
  protected readonly recipientB = signal('');
  protected readonly attachments = signal<AttachmentFile[]>([]);

  protected readonly canSubmit = computed(() => this.subject().trim().length > 0);

  private readonly contentEditor = viewChild<ElementRef<HTMLDivElement>>('contentEditor');

  setSubject(value: string): void {
    this.subject.set(value);
  }

  setClassification(value: string): void {
    this.classification.set(value);
  }

  setUrgency(value: string): void {
    this.urgency.set(value as Urgency);
  }

  onRecipientAChange(value: string): void {
    this.recipientA.set(value);
  }

  onRecipientBChange(value: string): void {
    this.recipientB.set(value);
  }

  exec(command: string, value?: string): void {
    this.contentEditor()?.nativeElement.focus();
    document.execCommand(command, false, value);
  }

  setFontFamily(value: string): void {
    this.exec('fontName', value === 'בררת מחדל' ? 'inherit' : value);
  }

  setFontColor(value: string): void {
    this.exec('foreColor', value);
  }

  onFilesSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!files) {
      return;
    }
    const newFiles: AttachmentFile[] = Array.from(files).map((file) => ({
      name: file.name,
      size: formatFileSize(file.size),
    }));
    this.attachments.set([...this.attachments(), ...newFiles]);
    (event.target as HTMLInputElement).value = '';
  }

  removeAttachment(name: string): void {
    this.attachments.set(this.attachments().filter((file) => file.name !== name));
  }

  submit(): void {
    if (!this.canSubmit()) {
      return;
    }
    const recipients = [this.recipientA(), this.recipientB()].filter((name) => name.trim().length > 0);
    this.store.sendMessage({
      subject: this.subject(),
      classification: this.classification(),
      urgency: this.urgency(),
      recipients,
      body: this.contentEditor()?.nativeElement.innerText ?? '',
      attachments: this.attachments(),
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
    this.recipientA.set('');
    this.recipientB.set('');
    this.attachments.set([]);
    const editor = this.contentEditor()?.nativeElement;
    if (editor) {
      editor.innerHTML = '';
    }
  }
}
