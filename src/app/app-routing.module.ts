import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PaginaRelatoriosComponent } from './pages/pagina-relatorios/pagina-relatorios.component';
import { MeusDadosComponent } from './pages/meus-dados/meus-dados.component';
import { PaginaCadastroComponent } from './pagina-cadastro/pagina-cadastro.component';
import { PaginaUsuariosComponent } from './pages/pagina-usuarios/pagina-usuarios.component';
import { PaginaCadastroMedicamentoComponent } from './pages/pagina-cadastro-medicamento/pagina-cadastro-medicamento.component';
import { PaginaListarMedicamentosComponent } from './pages/pagina-listar-medicamentos/pagina-listar-medicamentos.component';
import { AdminGuard } from './guards/admGuard';

import { FarmaciaGuard } from './guards/farmaciaGuard';
import { DashboardFarmaciaComponent } from './pages/dashboard-farmacia/dashboard-farmacia.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // rota inicial
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pagina-relatorios',
    component: PaginaRelatoriosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pagina-cadastro/:tipo',
    component: PaginaCadastroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pagina-cadastro/:tipo',
    component: PaginaCadastroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'meus-dados',
    component: MeusDadosComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'listar-usuarios/:tipo',
    component: PaginaUsuariosComponent,
    canActivate: [AdminGuard, AuthGuard],
  },
  {
    path: 'cadastrar-medicamento',
    component: PaginaCadastroMedicamentoComponent,
    canActivate: [AdminGuard, AuthGuard],
  },
  {
    path: 'listar-medicamentos',
    component: PaginaListarMedicamentosComponent,
    canActivate: [AdminGuard, AuthGuard],
  },

  {
    path: 'dashboard-farmacia',
    component: DashboardFarmaciaComponent,
    canActivate: [FarmaciaGuard, AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
