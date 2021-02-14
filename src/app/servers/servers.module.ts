import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarModule } from '../@components/navbar/navbar.module';
import { ServersListPage } from './servers-list/servers-list.page';
import { ServersRoutingModule } from './servers-routing.module';

@NgModule({
  declarations: [ServersListPage],
  imports: [CommonModule, ServersRoutingModule, NavbarModule],
})
export class ServersModule {}
