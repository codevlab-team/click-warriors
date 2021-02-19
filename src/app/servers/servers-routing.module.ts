import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServerPage } from './add-server/add-server.page';
import { ServersListPage } from './servers-list/servers-list.page';

const routes: Routes = [
  { path: '', component: ServersListPage },
  { path: 'add', component: AddServerPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServersRoutingModule {}
