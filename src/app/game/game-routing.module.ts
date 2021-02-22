import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattlePage } from './pages/battle/battle.page';

const routes: Routes = [{ path: 'battle/:serverId', component: BattlePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
