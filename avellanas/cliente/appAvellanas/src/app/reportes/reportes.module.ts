import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReporteVentasFechasComponent } from './reporte-ventas-fechas/reporte-ventas-fechas.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ReporteVentasMedioPagoComponent } from './reporte-ventas-medio-pago/reporte-ventas-medio-pago.component';
import { ReporteVentasTipoComponent } from './reporte-ventas-tipo/reporte-ventas-tipo.component';
import { ReporteVentasTipoMeseroComponent } from './reporte-ventas-tipo-mesero/reporte-ventas-tipo-mesero.component';


@NgModule({
  declarations: [
    ReporteVentasFechasComponent,
    ReporteVentasMedioPagoComponent,
    ReporteVentasTipoComponent,
    ReporteVentasTipoMeseroComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReporteVentasFechasComponent,
    ReporteVentasMedioPagoComponent,
    ReporteVentasTipoComponent,
    ReporteVentasTipoMeseroComponent
  ]
})
export class ReportesModule { }
