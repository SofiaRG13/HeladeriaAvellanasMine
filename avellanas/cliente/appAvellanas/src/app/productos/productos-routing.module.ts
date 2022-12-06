import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { ProductosAllComponent } from './productos-all/productos-all.component';
import { ProductosDetailComponent } from './productos-detail/productos-detail.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { ProductosComponent } from './productos/productos.component';


const routes: Routes = [
  {
    path: 'productos',component: ProductosComponent,
  },
  {
    path: 'productos-all',
    canActivate: [AuthGuard],
    component: ProductosAllComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  {
    path: 'productos-create',
    canActivate: [AuthGuard],
    component: ProductosFormComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  { path: 'productos/:id', component: ProductosDetailComponent },
  {
    path: 'productos/update/:id',
    canActivate: [AuthGuard],
    component: ProductosFormComponent,
    data: {
      rol: ['Administrador'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
