import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { UserAllComponent } from './user-all/user-all.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {
    path: 'usuarios-all',
    canActivate: [AuthGuard],
    component: UserAllComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  {
    path: 'usuarios-create',
    canActivate: [AuthGuard],
    component: UserFormComponent,
    data: {
      rol: ['Administrador'],
    },
  },
  {
    path: 'usuarios/update/:id',
    canActivate: [AuthGuard],
    component: UserFormComponent,
    data: {
      rol: ['Administrador'],
    },
  },

  {
    path: 'usuario',
    component: UserIndexComponent,
    children: [
      { path: 'registrar', component: UserCreateComponent },
      { path: 'login', component: UserLoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
