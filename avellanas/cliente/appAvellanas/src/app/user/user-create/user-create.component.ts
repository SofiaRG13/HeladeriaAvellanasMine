import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  hide = true;
  usuario: any;
  roles: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      id: null,
      nombre: [
        null,
        Validators.compose([
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
      ],
      apellido1: [
        null,
        Validators.compose([
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ]),
      ],
      apellido2: [
        null,
        Validators.compose([
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ]),
      ],
      email: [
        null,
        Validators.compose([
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ]),
      ],
      contrasenna: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),
      ],
      rol: "Cliente",
      idRestaurante: null,
    });
  }
  ngOnInit(): void {}
  submitForm() {
    this.makeSubmit=true;
   //Validación
   if(this.formCreate.invalid){
    return;
   }
   this.authService
   .createUser(this.formCreate.value)
   .subscribe((respuesta:any)=>{
    
    //Redireccionar al loguearse
    this.router.navigate(['/usuario/login'],{
      //Mostrar mensaje
      queryParams:{register:'true'}
    });
   });
  }
  onReset() {
    this.formCreate.reset();
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}
