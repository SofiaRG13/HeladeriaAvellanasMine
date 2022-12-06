import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoComponent } from '../heladeria/pedido/pedido.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { ClientePedidoComponent } from './cliente-pedido/cliente-pedido.component';
import { MesasPedidoComponent } from './mesas-pedido/mesas-pedido.component';
import { PagoComponent } from './pago/pago.component';
import { PedidoDetailComponent } from './pedido-detail/pedido-detail.component';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosUsuarioComponent } from './pedidos-usuario/pedidos-usuario.component';

const routes: Routes = [
  { path: 'pedido', component: PedidoComponent },
  {
    path: 'pedidos-all',
    canActivate: [AuthGuard],
    component: PedidosAllComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  {
    path: 'cliente-pedido',
    canActivate: [AuthGuard],
    component: ClientePedidoComponent,
    data: {
      rol: ['Cliente'],
    },
  },
  {
    path: 'pedidos-usuario',
    canActivate: [AuthGuard],
    component: PedidosUsuarioComponent,
    data: {
      rol: ['Cliente', 'Mesero'],
    },
  },
  { path: 'pago/:id', component: PagoComponent },
  {
    path: 'mesas-pedido/:id',
    canActivate: [AuthGuard],
    component: MesasPedidoComponent,
    data: {
      rol: ['Administrador', 'Mesero'],
    },
  },
  { path: 'pedido/:id', component: PedidoDetailComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
