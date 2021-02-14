import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServersListPage } from './servers-list/servers-list.page';

const routes: Routes = [{ path: '', component: ServersListPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServersRoutingModule {}
