import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardFarmaciaComponent } from './dashboard-farmacia.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: DashboardFarmaciaComponent }];

@NgModule({
  declarations: [DashboardFarmaciaComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class DashboardFarmaciaModule {}
