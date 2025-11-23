import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './guards/admGuard';
import { FarmaciaGuard } from './guards/farmaciaGuard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },

  {
    path: 'pagina-relatorios',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/pagina-relatorios/pagina-relatorios.module').then(
        (m) => m.PaginaRelatoriosModule
      ),
  },

  {
    path: 'meus-dados',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/meus-dados/meus-dados.module').then(
        (m) => m.MeusDadosModule
      ),
  },

  {
    path: 'pagina-cadastro/:tipo',
    canActivate: [],
    loadChildren: () =>
      import('./pages/pagina-cadastro/pagina-cadastro.module').then(
        (m) => m.PaginaCadastroModule
      ),
  },

  {
    path: 'listar-usuarios/:tipo',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import('./pages/pagina-usuarios/pagina-usuarios.module').then(
        (m) => m.PaginaUsuariosModule
      ),
  },

  {
    path: 'cadastrar-medicamento',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import(
        './pages/pagina-cadastro-medicamento/pagina-cadastro-medicamento.module'
      ).then((m) => m.PaginaCadastroMedicamentoModule),
  },

  {
    path: 'listar-medicamentos',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import(
        './pages/pagina-listar-medicamentos/pagina-listar-medicamentos.module'
      ).then((m) => m.PaginaListarMedicamentosModule),
  },

  {
    path: 'dashboard-farmacia',
    canActivate: [AuthGuard, FarmaciaGuard],
    loadChildren: () =>
      import('./pages/dashboard-farmacia/dashboard-farmacia.module').then(
        (m) => m.DashboardFarmaciaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
