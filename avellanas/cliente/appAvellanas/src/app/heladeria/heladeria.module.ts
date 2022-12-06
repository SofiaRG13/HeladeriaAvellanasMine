import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeladeriaRoutingModule } from './heladeria-routing.module';
import { MesasComponent } from './mesas/mesas.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosDetailComponent } from './productos-detail/productos-detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatDialogModule} from "@angular/material/dialog";
import { PedidoComponent } from './pedido/pedido.component';
import { PedidoDetailComponent } from './pedido-detail/pedido-detail.component';
import { ProductosAllComponent } from './productos-all/productos-all.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MesasFormComponent } from './mesas-form/mesas-form.component';
import { MesasAllComponent } from './mesas-all/mesas-all.component';
import { MesasDetailComponent } from './mesas-detail/mesas-detail.component';
import { MesasPedidoComponent } from './mesas-pedido/mesas-pedido.component';
import { ClientePedidoComponent } from './cliente-pedido/cliente-pedido.component';
import { ClientePedidosAllComponent } from './cliente-pedidos-all/cliente-pedidos-all.component';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PagoComponent } from './pago/pago.component';

@NgModule({
  declarations: [
    MesasComponent,
    ProductosComponent,
    ProductosDetailComponent,
    PedidoComponent,
    PedidoDetailComponent,
    ProductosAllComponent,
    ProductosFormComponent,
    MesasFormComponent,
    MesasAllComponent,
    MesasDetailComponent,
    MesasPedidoComponent,
    ClientePedidoComponent,
    ClientePedidosAllComponent,
    PedidosAllComponent,
    PagoComponent
  ],
  imports: [
    CommonModule,
    HeladeriaRoutingModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductosDetailComponent,
    ProductosAllComponent,
    ProductosFormComponent,
    MesasFormComponent,
    MesasAllComponent,
    MesasDetailComponent,
    MesasPedidoComponent,
    ClientePedidoComponent,
    ClientePedidosAllComponent,
    PedidosAllComponent,
    PagoComponent
  ],
})
export class HeladeriaModule { }
