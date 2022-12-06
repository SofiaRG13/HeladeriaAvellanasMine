import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  hide = true;
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  restaurantesList: any;
  rolesList: any;
  usuarioInfo: any;
  respUsuario: any;
  submitted = false;
  userForm: FormGroup;
  makeSubmit: boolean = false;
  idUsuario: number = 0;
  isCreate: boolean = true;
  isMesero: boolean = true;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService,
    private authService: AuthenticationService
  ) {
    this.formularioReactive();
    this.listaRestaurantes();
    this.listaRoles();
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idUsuario = params['id'];
      // === !== es igual == !=
      if (this.idUsuario !== undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        //Obtener videojuego a actualizar del API
        this.gService
          .get('usuario', this.idUsuario)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            //Cargar datos en el formulario
            this.usuarioInfo = data;
            this.userForm.setValue({
              id: this.usuarioInfo.id,
              nombre: this.usuarioInfo.nombre,
              apellido1: this.usuarioInfo.apellido1,
              apellido2: this.usuarioInfo.apellido2,
              email: this.usuarioInfo.email,
              contrasenna: this.usuarioInfo.contrasenna,
              rol: this.usuarioInfo.rol,
              idRestaurante: this.usuarioInfo.idRestaurante,
            });
            this.mostrarRestauranteForm();
          });
      }
    });
  }
  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.userForm = this.fb.group({
      //Nombre del FormControl: [valor, validación]
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
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      rol: [null, Validators.required],
      idRestaurante: [null, Validators.required],
    });
  }
  listaRestaurantes() {
    this.restaurantesList = null;
    this.gService
      .list('restaurante')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.restaurantesList = data;
      });
  }

  listaRoles() {
    this.rolesList = null;
    this.gService
      .list('rol')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.rolesList = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.userForm.controls[control].hasError(error);
  };

  mostrarRestauranteForm() {
    let rol = this.userForm.controls['rol'].value;
    
    if (rol === 'Mesero') {
      this.isMesero = false;
    } else {
      this.isMesero = true;
      this.userForm.get('idRestaurante').setValue(0);
      console.log(this.userForm.get('idRestaurante'));
    }
  }

  //Crear Usuario
  crearUsuario() {
    this.makeSubmit = true;
    //Validación
    if (this.userForm.invalid) {
      return;
    }
    this.authService
      .createUser(this.userForm.value)
      .subscribe((respuesta: any) => {
        this.router.navigate(['/usuarios-all'], {
          queryParams: { register: 'true' },
        });
      });
      this.noti.mensaje(
        'Usuario',
        'Usuario creado correctamente',
        TipoMessage.success
      );
  }

  //Actualizar Usuario
  actualizarUsuario() {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.userForm.invalid) {
      return;
    }
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('usuario', this.userForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.respUsuario = data;
        this.router.navigate(['/usuarios-all'], {
          queryParams: { update: 'true' },
        });
      });
    this.noti.mensaje(
      'Usuario',
      'Usuario actualizado correctamente',
      TipoMessage.success
    );
  }
  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }
  onBack() {
    this.router.navigate(['/usuarios-all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
