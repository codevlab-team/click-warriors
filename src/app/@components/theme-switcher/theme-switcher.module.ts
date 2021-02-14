import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeSwitcherComponent } from './theme-switcher.component';

@NgModule({
  declarations: [ThemeSwitcherComponent],
  imports: [CommonModule],
  exports: [ThemeSwitcherComponent],
})
export class ThemeSwitcherModule {}
