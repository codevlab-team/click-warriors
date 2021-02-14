import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  run(): void {
    const theme = localStorage.theme || 'dark';
    this.document.documentElement.classList.add(theme);
  }

  getTheme(): 'light' | 'dark' {
    return localStorage.theme;
  }

  toggleTheme(): void {
    const theme = this.getTheme();

    if (theme === 'light') {
      this.document.documentElement.classList.remove('light');
      this.document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      this.document.documentElement.classList.remove('dark');
      this.document.documentElement.classList.add('light');
      localStorage.theme = 'light';
    }
  }
}
