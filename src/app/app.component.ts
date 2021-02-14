import { Component } from '@angular/core';
import { ThemeService } from './@core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'click-warriors';

  constructor(private themeService: ThemeService) {
    this.themeService.run();
  }
}
