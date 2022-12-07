import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { ReporteVentasFechasComponent } from './reporte-ventas-fechas/reporte-ventas-fechas.component';
import { ReporteVentasMedioPagoComponent } from './reporte-ventas-medio-pago/reporte-ventas-medio-pago.component';
import { ReporteVentasTipoMeseroComponent } from './reporte-ventas-tipo-mesero/reporte-ventas-tipo-mesero.component';
import { ReporteVentasTipoComponent } from './reporte-ventas-tipo/reporte-ventas-tipo.component';

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
  {
    path: 'vTipo',
    canActivate: [AuthGuard],
    component: ReporteVentasTipoComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  {
    path: 'vMesero',
    canActivate: [AuthGuard],
    component: ReporteVentasTipoMeseroComponent,
    data: {
      rol: ['Mesero'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
