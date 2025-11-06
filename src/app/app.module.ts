import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { BotaoGenericoComponent } from './botao-generico/botao-generico.component';
import { BotaoInfoComponent } from './botao-info/botao-info.component';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { InputFormComponent } from './input-form/input-form.component';

import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { GraficoComponent } from './grafico/grafico.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BotaoRemedioComponent } from './botao-remedio/botao-remedio.component';
import { ModalMedicamentoComponent } from './modal-medicamento/modal-medicamento.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginaDadosComponent } from './pages/pagina-dados/pagina-dados.component';
import { PaginaRelatoriosComponent } from './pages/pagina-relatorios/pagina-relatorios.component';
import { CardRelatorioComponent } from './card-relatorio/card-relatorio.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { MeusDadosComponent } from './pages/meus-dados/meus-dados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginaCadastroComponent } from './pagina-cadastro/pagina-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    BotaoGenericoComponent,
    BotaoInfoComponent,
    InputFormComponent,
    LoginComponent,
    ModalComponent,
    GraficoComponent,
    ModalComponent,
    GraficoComponent,
    DashboardComponent,
    BotaoRemedioComponent,
    BotaoRemedioComponent,
    ModalMedicamentoComponent,
    NavbarComponent,
    PaginaDadosComponent,
    PaginaRelatoriosComponent,
    CardRelatorioComponent,
    PaginaCadastroComponent,
    FormularioUsuarioComponent,
    MeusDadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
