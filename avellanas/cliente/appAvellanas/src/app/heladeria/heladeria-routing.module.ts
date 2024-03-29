import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { ClientePedidoComponent } from './cliente-pedido/cliente-pedido.component';
import { ClientePedidosAllComponent } from './cliente-pedidos-all/cliente-pedidos-all.component';
import { MesasAllComponent } from './mesas-all/mesas-all.component';
import { MesasDetailComponent } from './mesas-detail/mesas-detail.component';
import { MesasFormComponent } from './mesas-form/mesas-form.component';
import { MesasPedidoComponent } from './mesas-pedido/mesas-pedido.component';
import { MesasComponent } from './mesas/mesas.component';
import { PagoComponent } from './pago/pago.component';
import { PedidoDetailComponent } from './pedido-detail/pedido-detail.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProductosAllComponent } from './productos-all/productos-all.component';
import { ProductosDetailComponent } from './productos-detail/productos-detail.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  /* {
    path: 'productos',component: ProductosComponent,
  }, */
  /* { path: 'pedido', component: PedidoComponent },
  
  {
    path: 'cliente-pedido',
    canActivate: [AuthGuard],
    component: ClientePedidoComponent,
    data: {
      rol: ['Cliente'],
    },
  }, */
  /* {
    path: 'cliente-pedidos-all',
    canActivate: [AuthGuard],
    component: ClientePedidosAllComponent,
    data: {
      rol: ['Cliente', 'Mesero'],
    },
  }, */
  /* {
    path: 'mesas',
    canActivate: [AuthGuard],
    component: MesasComponent,
    data: {
      rol: ['Administrador', 'Mesero'],
    },
  }, */
  /* {
    path: 'productos/all',
    canActivate: [AuthGuard],
    component: ProductosAllComponent,
    data: {
      rol: ['Administrador'],
    },
  }, */
  /* {
    path: 'mesas/all',
    canActivate: [AuthGuard],
    component: MesasAllComponent,
    data: {
      rol: ['Administrador'],
    },
  }, */
  /* {
    path: 'productos/create',
    canActivate: [AuthGuard],
    component: ProductosFormComponent,
    data: {
      rol: ['Administrador'],
    },
  }, */
  /* {
    path: 'mesas/create',
    canActivate: [AuthGuard],
    component: MesasFormComponent,
    data: {
      rol: ['Administrador'],
    },
  }, */
  /* { path: 'pago/:id', component: PagoComponent }, */
  /* { path: 'productos/:id', component: ProductosDetailComponent }, */
  /* {
    path: 'mesas/:id',
    canActivate: [AuthGuard],
    component: MesasDetailComponent,
    data: {
      rol: ['Administrador', 'Mesero'],
    },
  }, */
  /* {
    path: 'mesas-pedido/:id',
    canActivate: [AuthGuard],
    component: MesasPedidoComponent,
    data: {
      rol: ['Administrador', 'Mesero'],
    },
  },
  { path: 'pedido/:id', component: PedidoDetailComponent }, */
  /* {
    path: 'productos/update/:id',
    canActivate: [AuthGuard],
    component: ProductosFormComponent,
    data: {
      rol: ['Administrador'],
    },
  }, */
  /* {
    path: 'mesas/update/:id',
    canActivate: [AuthGuard],
    component: MesasFormComponent,
    data: {
      rol: ['Administrador'],
    },
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeladeriaRoutingModule {}
