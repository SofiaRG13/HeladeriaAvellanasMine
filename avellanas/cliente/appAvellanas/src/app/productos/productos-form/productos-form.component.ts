import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css'],
})
export class ProductosFormComponent {
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  restaurantesList: any;
  categoriasList: any;
  productoInfo: any;
  respProducto: any;
  submitted = false;
  productosForm: FormGroup;
  idProducto: number = 0;
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService
  ) {
    this.formularioReactive();
    this.listaCategorias();
    this.listaRestaurantes();
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProducto = params['id'];
      // === !== es igual == !=
      if (this.idProducto !== undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        //Obtener videojuego a actualizar del API
        this.gService
          .get('producto', this.idProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            //Cargar datos en el formulario
            this.productoInfo = data;
            this.productosForm.setValue({
              id: this.productoInfo.id,
              nombre: this.productoInfo.nombre,
              descripcion: this.productoInfo.descripcion,
              ingredientes: this.productoInfo.ingredientes,
              precio: this.productoInfo.precio,
              idCategoria: this.productoInfo.idCategoria,
              restaurantes: this.productoInfo.restaurantes.map(({ id }) => id),
            });
          });
      }
    });
  }
  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.productosForm = this.fb.group({
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
      descripcion: [
        null,
        Validators.compose([
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ]),
      ],
      ingredientes: [
        null,
        Validators.compose([
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ]),
      ],
      precio: [null, 
        Validators.compose([
          Validators.pattern('^[0-9]+$'),
          Validators.required,
        ]),
      ],
      idCategoria: [null, Validators.required],
      //restaurantes es un FormArray
      restaurantes: [null, Validators.required],
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

  listaCategorias() {
    this.categoriasList = null;
    this.gService
      .list('productoCategoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.categoriasList = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.productosForm.controls[control].hasError(error);
  };

  //Crear Producto
  crearProducto(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.productosForm.invalid) {
      return;
    }
    console.log(this.productosForm.value);
    //Obtener id Restaurantes del Formulario y Crear arreglo con {id: value}
    let gFormat: any = this.productosForm
      .get('restaurantes')
      .value.map((x) => ({ ['id']: x }));

    //Asignar valor al formulario
    this.productosForm.patchValue({ restaurantes: gFormat });

    //Accion API create enviando toda la informacion del formulario
    this.gService
      .create('producto', this.productosForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.respProducto = data;
        this.router.navigate(['/productos-all'], {
          queryParams: { create: 'true' },
        });
      });
      this.noti.mensaje('Producto', 'Producto creado correctamente', TipoMessage.success);
  }
  //Actualizar Producto
  actualizarProducto() {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.productosForm.invalid) {
      return;
    }
    
    //Obtener id restaurantes del Formulario y Crear arreglo con {id: value}
    let gFormat: any = this.productosForm
      .get('restaurantes')
      .value.map((x) => ({ ['id']: x }));

    //Asignar valor al formulario
    this.productosForm.patchValue({ restaurantes: gFormat });
    console.log(this.productosForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('producto', this.productosForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.respProducto = data;
        this.router.navigate(['/productos-all'], {
          queryParams: { update: 'true' },
        });
      });
      this.noti.mensaje('Producto', 'Producto actualizado correctamente', TipoMessage.success);
  }
  onReset() {
    this.submitted = false;
    this.productosForm.reset();
  }
  onBack() {
    this.router.navigate(['/productos-all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
