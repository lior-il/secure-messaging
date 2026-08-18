import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppShellComponent } from './layout/app-shell/app-shell.component';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
