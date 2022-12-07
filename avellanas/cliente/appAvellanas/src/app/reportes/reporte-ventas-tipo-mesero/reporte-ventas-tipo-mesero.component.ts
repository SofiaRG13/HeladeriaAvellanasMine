import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-reporte-ventas-tipo-mesero',
  templateUrl: './reporte-ventas-tipo-mesero.component.html',
  styleUrls: ['./reporte-ventas-tipo-mesero.component.css'],
})
export class ReporteVentasTipoMeseroComponent implements OnInit {
  datos: any;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  formulario: FormGroup;
  titulo: any;
  currentUser: any;
  idUsuario: any;

  constructor(
    private gService: GenericService,
    public fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
    //Informacion Usuario

    //Subscripción a la información del usuario actual

    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.idUsuario = this.currentUser.user.id;
    console.log(this.currentUser.user.id);
    this.formulario.controls['id'].setValue(this.idUsuario);
  }
  reporteFiltrado() {
    this.gService
      .create('reporte/vMesero', this.formulario.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        console.log(this.datos);
      });
    this.titulo = `Reporte de ventas del ${this.formulario.value.fechaInicial.toLocaleDateString()} hasta  ${this.formulario.value.fechaFinal.toLocaleDateString()}`;
  }
  reactiveForm() {
    this.formulario = this.fb.group({
      fechaInicial: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]],
      id: [null],
    });
  }

  onReset() {
    this.formulario.reset();
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };

  //npm install jspdf
  openPDF() {
    //htmlData: id del elemento HTML
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      //Configuración del ancho y alto del Canvas de la imagen
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      //devuelve un data URI,el cual contiene una representación
      // de la imagen en el formato especificado por el parámetro type
      const FILEURI = canvas.toDataURL('image/png');
      //Orientación, unidad, formato
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      //Agregar imagen al PDF
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('reporteVentas.pdf');
    });
  }
}
