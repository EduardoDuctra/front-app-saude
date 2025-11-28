import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  //página inicial da aplicação
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/pages/login/login.module').then((m) => m.LoginModule),
  },

  // não carrega nada além do login -> LAZYLOADING
  {
    path: '',
    loadChildren: () =>
      import('./modules/root/root.routes').then((m) => m.ROOT_ROUTES),
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
