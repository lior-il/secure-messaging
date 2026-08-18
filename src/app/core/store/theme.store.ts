import { effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { signalStore, withState, withMethods, withHooks, patchState } from '@ngrx/signals';

interface ThemeState {
  isDark: boolean;
}

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withState<ThemeState>({ isDark: false }),
  withMethods((store) => ({
    toggle(): void {
      patchState(store, { isDark: !store.isDark() });
    },
  })),
  withHooks({
    onInit(store) {
      const document = inject(DOCUMENT);
      effect(() => {
        document.documentElement.setAttribute('data-theme', store.isDark() ? 'dark' : 'light');
      });
    },
  })
);
