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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // rota inicial
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pagina-relatorios', component: PaginaRelatoriosComponent },
  { path: 'pagina-cadastro/:tipo', component: PaginaCadastroComponent },
  { path: 'pagina-cadastro/:tipo', component: PaginaCadastroComponent },
  { path: 'meus-dados', component: MeusDadosComponent },
  { path: 'listar-usuarios/:tipo', component: PaginaUsuariosComponent },
  {
    path: 'cadastrar-medicamento',
    component: PaginaCadastroMedicamentoComponent,
  },
  {
    path: 'listar-medicamentos',
    component: PaginaListarMedicamentosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
