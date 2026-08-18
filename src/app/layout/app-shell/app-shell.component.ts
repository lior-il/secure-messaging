import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { FooterComponent } from '../footer/footer.component';
import { ComposeDialogComponent } from '../compose-dialog/compose-dialog.component';
import { MessagesStore } from '../../core/store/messages.store';

@Component({
  selector: 'app-shell',
  imports: [HeaderComponent, SidebarComponent, MainContentComponent, FooterComponent, ComposeDialogComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent implements OnInit {
  protected readonly messagesStore = inject(MessagesStore);

  ngOnInit(): void {
    this.messagesStore.loadMessages();
  }
}
