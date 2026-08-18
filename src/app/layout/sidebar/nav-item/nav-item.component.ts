import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconComponent, IconName } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-nav-item',
  imports: [IconComponent],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
  readonly label = input.required<string>();
  readonly icon = input.required<IconName>();
  readonly count = input<number>();
  readonly active = input(false);
  readonly urgent = input(false);
  readonly selected = output<void>();
}
