import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattlePage } from './pages/battle/battle.page';
import { ScoreboardPage } from './pages/scoreboard/scoreboard.page';

const routes: Routes = [
  { path: 'battle', component: BattlePage },
  { path: 'scoreboard', component: ScoreboardPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
