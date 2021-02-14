import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/@core/services/theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  onClick(): void {
    this.themeService.toggleTheme();
  }
}
