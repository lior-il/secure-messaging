import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'sliders'
  | 'mailbox'
  | 'settings'
  | 'search'
  | 'refresh'
  | 'table-view'
  | 'grid-view'
  | 'inbox'
  | 'send'
  | 'check'
  | 'alert'
  | 'star'
  | 'archive'
  | 'chevron-down'
  | 'plus'
  | 'mail'
  | 'moon'
  | 'flag'
  | 'attachment'
  | 'edit'
  | 'paper-plane'
  | 'align-right'
  | 'align-center'
  | 'align-left'
  | 'list-bullet'
  | 'list-numbered'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'undo'
  | 'redo'
  | 'user';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-icon' },
})
export class IconComponent {
  readonly name = input.required<IconName>();
}
