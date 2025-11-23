import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PaginaListarMedicamentosComponent } from './pagina-listar-medicamentos.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: PaginaListarMedicamentosComponent },
];

@NgModule({
  declarations: [PaginaListarMedicamentosComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class PaginaListarMedicamentosModule {}
