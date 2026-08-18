import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { MessagesStore } from '../../core/store/messages.store';
import { ThemeStore } from '../../core/store/theme.store';
import { PRIMARY_FOLDERS, NAV_SECTIONS } from '../../core/data/nav-config';
import { FolderId } from '../../core/models/message.model';

@Component({
  selector: 'app-sidebar',
  imports: [IconComponent, NavItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly messagesStore = inject(MessagesStore);
  protected readonly themeStore = inject(ThemeStore);

  protected readonly primaryFolders = PRIMARY_FOLDERS;
  protected readonly sections = NAV_SECTIONS;

  protected readonly selectedFolder = this.messagesStore.selectedFolder;
  protected readonly inboxUnreadCount = this.messagesStore.inboxUnreadCount;
  protected readonly userEmail = signal('israelisraeli@police.gov.il');

  private readonly collapsedSections = signal(new Set<string>());
  protected readonly isSectionOpen = (sectionId: string) =>
    computed(() => !this.collapsedSections().has(sectionId));

  selectFolder(id: FolderId): void {
    this.messagesStore.selectFolder(id);
  }

  openCompose(): void {
    this.messagesStore.openCompose();
  }

  toggleSection(sectionId: string): void {
    const next = new Set(this.collapsedSections());
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    this.collapsedSections.set(next);
  }

  toggleTheme(): void {
    this.themeStore.toggle();
  }
}
