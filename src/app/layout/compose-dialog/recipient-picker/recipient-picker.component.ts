import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MOCK_RECIPIENTS } from '../../../core/data/mock-recipients';

@Component({
  selector: 'app-recipient-picker',
  templateUrl: './recipient-picker.component.html',
  styleUrl: './recipient-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipientPickerComponent {
  readonly label = input.required<string>();
  readonly recipientSelected = output<string>();

  protected readonly query = signal('');
  protected readonly isOpen = signal(false);

  protected readonly suggestions = computed(() => {
    const value = this.query().trim().toLowerCase();
    return MOCK_RECIPIENTS.filter((name) => !value || name.toLowerCase().includes(value));
  });

  onInput(value: string): void {
    this.query.set(value);
    this.isOpen.set(true);
    this.recipientSelected.emit(value.trim());
  }

  select(name: string): void {
    this.query.set(name);
    this.isOpen.set(false);
    this.recipientSelected.emit(name);
  }

  onFocus(): void {
    this.isOpen.set(true);
  }

  onBlur(): void {
    this.isOpen.set(false);
  }
}
