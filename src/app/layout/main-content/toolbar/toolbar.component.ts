import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { IconComponent } from '../../../shared/icon/icon.component';
import { MessagesStore } from '../../../core/store/messages.store';

@Component({
  selector: 'app-toolbar',
  imports: [IconComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  protected readonly store = inject(MessagesStore);

  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  setViewMode(mode: 'table' | 'grid'): void {
    this.store.setViewMode(mode);
  }

  onSearchInput(value: string): void {
    this.store.setSearchQuery(value);
  }

  onSearchIconClick(): void {
    if (this.store.searchQuery()) {
      this.store.setSearchQuery('');
    }
    this.searchInput()?.nativeElement.focus();
  }

  refresh(): void {
    if (this.store.loading()) {
      return;
    }
    this.store.loadMessages();
  }
}
