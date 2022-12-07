import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { ReporteVentasFechasComponent } from './reporte-ventas-fechas/reporte-ventas-fechas.component';
import { ReporteVentasMedioPagoComponent } from './reporte-ventas-medio-pago/reporte-ventas-medio-pago.component';

const routes: Routes = [
  {
    path: 'vFechas',
    canActivate: [AuthGuard],
    component: ReporteVentasFechasComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  {
    path: 'vMedioPago',
    canActivate: [AuthGuard],
    component: ReporteVentasMedioPagoComponent,
    data: {
      rol: ['Administrador'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}