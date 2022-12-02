import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { MesasAllComponent } from './mesas-all/mesas-all.component';
import { MesasDetailComponent } from './mesas-detail/mesas-detail.component';
import { MesasFormComponent } from './mesas-form/mesas-form.component';
import { MesasPedidoComponent } from './mesas-pedido/mesas-pedido.component';
import { MesasComponent } from './mesas/mesas.component';
import { PedidoDetailComponent } from './pedido-detail/pedido-detail.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProductosAllComponent } from './productos-all/productos-all.component';
import { ProductosDetailComponent } from './productos-detail/productos-detail.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  {
    path: 'productos',
    canActivate: [AuthGuard],
    component: ProductosComponent,
    data: {
      rol: ["Administrador", "Cliente"],
    },
  },
  { path: 'pedido', component: PedidoComponent },
  {
    path: 'mesas',
    canActivate: [AuthGuard],
    component: MesasComponent,
    data: {
      rol: ['Administrador', 'Mesero'],
    },
  },
  {
    path: 'productos/all',
    canActivate: [AuthGuard],
    component: ProductosAllComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  {
    path: 'mesas/all',
    canActivate: [AuthGuard],
    component: MesasAllComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  {
    path: 'productos/create',
    canActivate: [AuthGuard],
    component: ProductosFormComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  {
    path: 'mesas/create',
    canActivate: [AuthGuard],
    component: MesasFormComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  { path: 'productos/:id', component: ProductosDetailComponent },
  {
    path: 'mesas/:id',
    canActivate: [AuthGuard],
    component: MesasDetailComponent,
    data: {
      rol: ['Administrador', 'Mesero'],
    },
  },
  {
    path: 'mesas-pedido/:id',
    canActivate: [AuthGuard],
    component: MesasPedidoComponent,
    data: {
      rol: ['Administrador', 'Mesero'],
    },
  },
  { path: 'pedido/:id', component: PedidoDetailComponent },
  {
    path: 'productos/update/:id',
    canActivate: [AuthGuard],
    component: ProductosFormComponent,
    data: {
      rol: ['Administrador'],
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
  exports: [RouterModule],
})
export class HeladeriaRoutingModule {}
