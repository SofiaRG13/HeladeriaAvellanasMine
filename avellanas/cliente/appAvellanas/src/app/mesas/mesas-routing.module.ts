import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { MesasAllComponent } from './mesas-all/mesas-all.component';
import { MesasDetailComponent } from './mesas-detail/mesas-detail.component';
import { MesasFormComponent } from './mesas-form/mesas-form.component';
import { MesasComponent } from './mesas/mesas.component';

const routes: Routes = [
  {
    path: 'mesas',
    canActivate: [AuthGuard],
    component: MesasComponent,
    data: {
      rol: ['Administrador', 'Mesero'],
    },
  },
  {
    path: 'mesas-all',
    canActivate: [AuthGuard],
    component: MesasAllComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  {
    path: 'mesas-create',
    canActivate: [AuthGuard],
    component: MesasFormComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  {
    path: 'mesas/:id',
    canActivate: [AuthGuard],
    component: MesasDetailComponent,
    data: {
      rol: ['Administrador', 'Mesero'],
    },
  },
  {
    path: 'mesas/update/:id',
    canActivate: [AuthGuard],
    component: MesasFormComponent,
    data: {
      rol: ['Administrador'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesasRoutingModule { }
