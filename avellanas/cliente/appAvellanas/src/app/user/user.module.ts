import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatDialogModule} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import {MatCardModule} from '@angular/material/card';
import { UserAllComponent } from './user-all/user-all.component';
import { UserFormComponent } from './user-form/user-form.component'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    UserCreateComponent,
    UserIndexComponent,
    UserLoginComponent,
    UserAllComponent,
    UserFormComponent
  ],
  imports: [CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,MatIconModule,
    LayoutModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule, UserRoutingModule],
  exports: [
    UserCreateComponent,
    UserIndexComponent,
    UserLoginComponent,
    UserAllComponent,
    UserFormComponent
  ]
})
export class UserModule { }
