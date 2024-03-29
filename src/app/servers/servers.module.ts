import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../@components/loader/loader.module';
import { NavbarModule } from '../@components/navbar/navbar.module';
import { AddServerPage } from './add-server/add-server.page';
import { ServersListPage } from './servers-list/servers-list.page';
import { ServersRoutingModule } from './servers-routing.module';

@NgModule({
  declarations: [ServersListPage, AddServerPage],
  imports: [
    CommonModule,
    ServersRoutingModule,
    ReactiveFormsModule,
    NavbarModule,
    LoaderModule,
  ],
})
export class ServersModule {}
