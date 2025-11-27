import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PaginaCadastroComponent } from './pagina-cadastro.component';

const routes: Routes = [{ path: '', component: PaginaCadastroComponent }];

@NgModule({
  declarations: [PaginaCadastroComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class PaginaCadastroModule {}
