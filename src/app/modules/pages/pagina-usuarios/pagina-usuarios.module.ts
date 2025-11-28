import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PaginaUsuariosComponent } from './pagina-usuarios.component';

const routes: Routes = [{ path: '', component: PaginaUsuariosComponent }];

@NgModule({
  declarations: [PaginaUsuariosComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class PaginaUsuariosModule {}
