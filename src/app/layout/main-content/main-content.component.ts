import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MessageTableComponent } from './message-table/message-table.component';
import { MessageGridComponent } from './message-grid/message-grid.component';
import { MessagesStore } from '../../core/store/messages.store';

@Component({
  selector: 'app-main-content',
  imports: [ToolbarComponent, MessageTableComponent, MessageGridComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContentComponent {
  protected readonly store = inject(MessagesStore);
}
