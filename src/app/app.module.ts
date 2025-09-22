import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { InputSenhaComponent } from './input-senha/input-senha.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { GraficoComponent } from './grafico/grafico.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    BotaoGenericoComponent,
    BotaoInfoComponent,
    InputFormComponent,
    InputSenhaComponent,
    LoginComponent,
    ModalComponent,
    GraficoComponent,
    ModalComponent,
    GraficoComponent,
    DashboardComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
