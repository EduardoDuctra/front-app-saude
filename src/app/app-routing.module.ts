import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PaginaRelatoriosComponent } from './pages/pagina-relatorios/pagina-relatorios.component';
import { MeusDadosComponent } from './pages/meus-dados/meus-dados.component';
import { PaginaCadastroComponent } from './pagina-cadastro/pagina-cadastro.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // rota inicial
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pagina-relatorios', component: PaginaRelatoriosComponent },
  { path: 'pagina-cadastro/:tipo', component: PaginaCadastroComponent },
  { path: 'pagina-cadastro/:tipo', component: PaginaCadastroComponent },
  { path: 'meus-dados', component: MeusDadosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
