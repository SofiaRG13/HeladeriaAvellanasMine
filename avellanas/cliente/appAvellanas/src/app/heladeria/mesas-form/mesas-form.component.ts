import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-mesas-form',
  templateUrl: './mesas-form.component.html',
  styleUrls: ['./mesas-form.component.css'],
})
export class MesasFormComponent {
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  restaurantesList: any;
  restauranteInfo: any;
  estadosList: any;
  mesaInfo: any;
  respMesa: any;
  submitted = false;
  mesasForm: FormGroup;
  idMesa: number = 0;
  isCreate: boolean = true;
  idRestaurante: number;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService
  ) {
    this.formularioReactive();
    this.listaRestaurantes();
    this.listaEstados();
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idMesa = params['id'];
      // === !== es igual == !=
      if (this.idMesa !== undefined) {
        this.isCreate = false;

        //this.mesasForm.get('idRestaurante').readOnly= true;
        this.titleForm = 'Actualizar';
        //Obtener videojuego a actualizar del API
        this.gService
          .get('mesas', this.idMesa)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            //Cargar datos en el formulario
            this.mesaInfo = data;
            this.mesasForm.setValue({
              id: this.mesaInfo.id,
              codigo: this.mesaInfo.codigo,
              estado: this.mesaInfo.estado,
              capacidad: this.mesaInfo.capacidad,
              idRestaurante: this.mesaInfo.idRestaurante,
            });
          });
      }
    });
  }
  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.mesasForm = this.fb.group({
      //Nombre del FormControl: [valor, validación]
      id: null,
      codigo: null,
      estado: [null, Validators.required],
      capacidad: [null, 
        Validators.compose([
          Validators.pattern('^[0-9]+$'),
          Validators.required,
        ]),
      ],
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

  listaEstados() {
    this.estadosList = null;
    this.gService
      .list('estadoMesa')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.estadosList = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.mesasForm.controls[control].hasError(error);
  };

  getCodigoMesa(value: number) {
    this.idRestaurante = value;
    //console.log(this.idRestaurante);
    if (this.idRestaurante !== undefined) {
      //Obtener producto a mostrar del API
      this.gService
        .get('restaurante', this.idRestaurante)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.restauranteInfo = data;
          this.generarCodigoMesa();
        });
    }
  }

  generarCodigoMesa() {
    let cantMesas: number;
    let codigo: string;
    cantMesas = this.restauranteInfo.mesas.length;

    switch (this.idRestaurante) {
      case 1:
        codigo = 'AVA-' + (cantMesas + 1);
        break;
      case 2:
        codigo = 'AVB-' + (cantMesas + 1);
        break;
      case 3:
        codigo = 'AVC-' + (cantMesas + 1);
        break;
      case 4:
        codigo = 'AVD-' + (cantMesas + 1);
        break;
      case 5:
        codigo = 'AVE-' + (cantMesas + 1);
        break;
      case 6:
        codigo = 'AVF-' + (cantMesas + 1);
        break;
    }
    this.mesasForm.get('codigo').setValue(codigo);
  }

  //Crear Mesa
  crearMesa(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.mesasForm.invalid) {
      return;
    }
    console.log(this.mesasForm.value);

    //Accion API create enviando toda la informacion del formulario
    this.gService
      .create('mesas', this.mesasForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.respMesa = data;
        this.router.navigate(['/mesas/all'], {
          queryParams: { create: 'true' },
        });
      });
    this.noti.mensaje('Mesa', 'Mesa creada correctamente', TipoMessage.success);
  }

  //Actualizar Mesa
  actualizarMesa() {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.mesasForm.invalid) {
      return;
    }
    console.log(this.mesasForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('mesas', this.mesasForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.respMesa = data;
        this.router.navigate(['/mesas/all'], {
          queryParams: { update: 'true' },
        });
      });
    this.noti.mensaje(
      'Mesa',
      'Mesa actualizada correctamente',
      TipoMessage.success
    );
  }
  onReset() {
    this.submitted = false;
    this.mesasForm.reset();
  }
  onBack() {
    this.router.navigate(['/mesas/all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
