import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesasRoutingModule } from './mesas-routing.module';
import { MesasComponent } from './mesas/mesas.component';
import { MesasFormComponent } from './mesas-form/mesas-form.component';
import { MesasAllComponent } from './mesas-all/mesas-all.component';
import { MesasDetailComponent } from './mesas-detail/mesas-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    MesasComponent,
    MesasFormComponent,
    MesasAllComponent,
    MesasDetailComponent
  ],
  imports: [
    CommonModule,
    MesasRoutingModule,
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
    MesasComponent,
    MesasFormComponent,
    MesasAllComponent,
    MesasDetailComponent
  ]
})
export class MesasModule { }
