import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { BotaoGenericoComponent } from './botao-generico/botao-generico.component';
import { BotaoInfoComponent } from './botao-info/botao-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    BotaoGenericoComponent,
    BotaoInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
