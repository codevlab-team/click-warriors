import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@core/guards/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: Path.Home, pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'servers',
    loadChildren: () =>
      import('./servers/servers.module').then((m) => m.ServersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'lobby',
    loadChildren: () =>
      import('./lobby/lobby.module').then((m) => m.LobbyModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
    canActivate: [AuthGuard],
  },
  // Not found page (must go at the bottom)
  // {
  //   path: '**',
  //   loadChildren: () =>
  //     import('@containers/not-found/not-found.module').then(
  //       (m) => m.NotFoundModule,
  //     ),
  //   component: NotFoundPage,
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
