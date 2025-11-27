import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PaginaCadastroMedicamentoComponent } from './pagina-cadastro-medicamento.component';

const routes: Routes = [
  { path: '', component: PaginaCadastroMedicamentoComponent },
];

@NgModule({
  declarations: [PaginaCadastroMedicamentoComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class PaginaCadastroMedicamentoModule {}
