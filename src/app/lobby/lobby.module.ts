import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderModule } from '../@components/loader/loader.module';
import { NavbarModule } from '../@components/navbar/navbar.module';
import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyPage } from './lobby.page';

@NgModule({
  declarations: [LobbyPage],
  imports: [CommonModule, LobbyRoutingModule, NavbarModule, LoaderModule],
})
export class LobbyModule {}
