import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProductosDetailComponent } from './productos-detail/productos-detail.component';
import { ProductosAllComponent } from './productos-all/productos-all.component';
import { ProductosComponent } from './productos/productos.component';


@NgModule({
  declarations: [
    ProductosFormComponent,
    ProductosDetailComponent,
    ProductosAllComponent,
    ProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductosFormComponent,
    ProductosDetailComponent,
    ProductosAllComponent,
    ProductosComponent
  ]
})
export class ProductosModule { }
