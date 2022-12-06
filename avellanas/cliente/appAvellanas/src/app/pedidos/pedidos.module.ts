import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosUsuarioComponent } from './pedidos-usuario/pedidos-usuario.component';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidoDetailComponent } from './pedido-detail/pedido-detail.component';
import { MesasPedidoComponent } from './mesas-pedido/mesas-pedido.component';
import { ClientePedidoComponent } from './cliente-pedido/cliente-pedido.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PagoComponent } from './pago/pago.component';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    PedidosUsuarioComponent,
    PedidosAllComponent,
    PedidoDetailComponent,
    MesasPedidoComponent,
    ClientePedidoComponent,
    PagoComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PedidosUsuarioComponent,
    PedidosAllComponent,
    PedidoDetailComponent,
    MesasPedidoComponent,
    ClientePedidoComponent,
    PagoComponent
  ]
})
export class PedidosModule { }
