import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MeusDadosComponent } from './meus-dados.component';

const routes: Routes = [{ path: '', component: MeusDadosComponent }];

@NgModule({
  declarations: [MeusDadosComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class MeusDadosModule {}
