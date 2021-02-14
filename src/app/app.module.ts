import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeSwitcherModule } from './@components/theme-switcher/theme-switcher.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ThemeSwitcherModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
