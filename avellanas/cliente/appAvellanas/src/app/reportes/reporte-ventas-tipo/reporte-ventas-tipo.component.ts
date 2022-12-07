import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-reporte-ventas-tipo',
  templateUrl: './reporte-ventas-tipo.component.html',
  styleUrls: ['./reporte-ventas-tipo.component.css'],
})
export class ReporteVentasTipoComponent implements AfterViewInit {
  formulario: FormGroup;
  makeSubmit: boolean = false;
  //Canvas para el grafico
  canvas: any;
  //Contexto del Canvas
  ctx: any;
  //Elemento html del Canvas
  @ViewChild('graficoCanvas') graficoCanvas!: { nativeElement: any };
  //Establecer gráfico
  grafico: any;
  //Datos para mostrar en el gráfico
  datos: any;
  //Lista de meses para filtrar el gráfico
  tipoList: any;
  //Listas
  listas: any;

  tipo: any;

  id: any;
  //fecha actual
  date = new Date();
  filtro = `Reporte de ventas del ${this.date.toLocaleDateString()}`;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService, public fb: FormBuilder) {
    this.reactiveForm();
    this.listaTip();
  }
  reactiveForm() {
    this.formulario = this.fb.group({
      fechaInicial: [null, [Validators.required]],
      fechaFinal: [null, [Validators.required]],
      tipo: [null, Validators.required],
      id: [null, Validators.required],
    });
  }
  listaTip() {
    this.tipoList = [
      { Value: 1, Text: 'Mesa' },
      { Value: 2, Text: 'Mesero' },
      { Value: 3, Text: 'Producto' },
    ];
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };

  ngAfterViewInit(): void {
    //this.inicioGrafico();
  }
  lista(value: number) {
    this.tipo = value;
    console.log(this.tipo);

    //Ruta de API
    if (this.tipo !== undefined) {
      if (this.tipo === 1) {
        console.log(this.tipo.value);
        this.gService
          .list('mesas/')
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log(data);
            this.listas = data;
          });
      } else {
        if (this.tipo === 2) {
          this.gService
            .list('usuario/mesero')
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
              console.log(data);
              this.listas = data;
            });
        } else {
          if (this.tipo === 3) {
            this.gService
              .list('producto')
              .pipe(takeUntil(this.destroy$))
              .subscribe((data: any) => {
                console.log(data);
                this.listas = data;
              });
          }
        }
      }
    }
  }

  /*   inicioGrafico() {
    //Obtener información del API
    this.gService
      .list('reporte/tipoPagoTotal')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        console.log(this.datos);
        this.graficoBrowser();
      });
  } */

  reporteFiltrado() {
    if (this.formulario) {
      //Obtener información del API
      if (this.tipo === 1) {
        this.gService
          .create('reporte/vMesa', this.formulario.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.datos = data;
            console.log(this.datos);
            this.graficoBrowser();
          });
      }
      if (this.tipo == 2) {
        this.gService
          .create('reporte/vMesero', this.formulario.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.datos = data;
            console.log(this.datos);
            this.graficoBrowser();
          });
      }
      if (this.tipo == 3) {
        this.gService
          .create('reporte/vProducto', this.formulario.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.datos = data;
            console.log(this.datos);
            this.graficoBrowser();
          });
      }
    }
  }

  //Configurar y crear gráfico
  graficoBrowser(): void {
    this.canvas = this.graficoCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    //Si existe destruir el Canvas para mostrar el grafico
    if (this.grafico) {
      this.grafico.destroy();
    }
    this.grafico = new Chart(this.ctx, {
      type: 'pie',
      data: {
        //Etiquetas del grafico, debe ser un array
        labels: this.datos.map((x) => x.Nombre),
        datasets: [
          {
            backgroundColor: [
              'lightblue',
            ],
            //Datos del grafico, debe ser un array
            data: this.datos.map((x) => x.Total_Ventas),
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
