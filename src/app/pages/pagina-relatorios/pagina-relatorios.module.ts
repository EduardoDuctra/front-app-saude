import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PaginaRelatoriosComponent } from './pagina-relatorios.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: PaginaRelatoriosComponent }];

@NgModule({
  declarations: [PaginaRelatoriosComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class PaginaRelatoriosModule {}
