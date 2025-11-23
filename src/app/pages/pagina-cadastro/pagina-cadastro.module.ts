import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PaginaCadastroComponent } from './pagina-cadastro.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: PaginaCadastroComponent }];

@NgModule({
  declarations: [PaginaCadastroComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class PaginaCadastroModule {}
