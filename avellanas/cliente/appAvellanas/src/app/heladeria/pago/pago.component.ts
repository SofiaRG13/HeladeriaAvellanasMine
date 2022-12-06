import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  formulario: FormGroup;
  infoPedido: any;
  idPedido: number;
  idMesa: number;
  respUpdate: any;
  currentUser: any;
  mesaInfo: any;
  tarjeta: any;
  total = 0;
  fecha = Date.now();

  constructor(
    public fb: FormBuilder,
    private gService: GenericService,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService,
    private noti: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
    //Subscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      //console.log(params);
      this.idPedido = params['id'];
      if (this.idPedido !== undefined) {
        //Obtener producto a mostrar del API
        this.gService
          .get('pedido', this.idPedido)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.infoPedido = data;
          });
      }
    });
  }

  // Definir el formulario con su reglas de validación
  reactiveForm() {
    this.formulario = this.fb.group({
      tipoPago: ['', [Validators.required]],
      pagacon: [
        null,
        Validators.compose([
          Validators.pattern('^[0-9]+$'),
          Validators.required,
        ]),
      ],
      numTarjeta: [
        null,
        Validators.compose([
          Validators.pattern('^[0-9]+$'),
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ]),
      ],
      vencimiento: [null, Validators.compose([Validators.required])],
      cvv: [
        null,
        Validators.compose([
          Validators.pattern('^[0-9]+$'),
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
        ]),
      ],
    });
  }

  onReset() {
    this.formulario.reset();
  }

  pagoEfectivo() {
    let efectivoStr = this.formulario.controls['pagacon'].value;
    let efectivo = +efectivoStr;
    if (efectivo < this.infoPedido.total) {
      this.noti.mensaje(
        'Pago',
        'Debe ingresar un monto mayor o igual al total',
        TipoMessage.error
      );
    } else {
      this.pagar();
    }
  }

  pagoAmbas() {
    let efectivoStr = this.formulario.controls['pagacon'].value;
    let efectivo = +efectivoStr;
    if (efectivo >= this.infoPedido.total) {
      this.noti.mensaje(
        'Pago',
        'Todo el pago se hará en efectivo. Seleccione la opción de pago con Efectivo',
        TipoMessage.error
      );
    } else {
      let currentDate = new Date();
      const date = formatDate(currentDate, 'yyyy-MM', 'en-US');

      if (this.formulario.controls['vencimiento'].value < date) {
        this.noti.mensaje('Pago', 'Tarjeta vencida', TipoMessage.error);
      } else {
        this.pagar();
      }
    }
  }

  pagoTarjeta() {
    let currentDate = new Date();
    const date = formatDate(currentDate, 'yyyy-MM', 'en-US');

    if (this.formulario.controls['vencimiento'].value < date) {
      this.noti.mensaje('Pago', 'Tarjeta vencida', TipoMessage.error);
    } else {
      this.pagar();
    }
  }

  pagar() {
    if (this.currentUser.user.rol === 'Cliente') {
      this.updateEstadoPedidoPorEntregar(this.infoPedido.id);
      this.noti.mensaje('Pago', 'Pago realizado', TipoMessage.success);
      this.router.navigate(['/mesas/'], {
        relativeTo: this.route,
      });
    } else {
      this.updateEstadoPedidoPagada(this.infoPedido.id);
      this.updateMesaEstadoDesocupada(this.infoPedido.idMesa);
      this.noti.mensaje('Pago', 'Pago realizado', TipoMessage.success);
      this.router.navigate(['/mesas/'], {
        relativeTo: this.route,
      });
    }
  }

  updateMesaEstadoDesocupada(idMesa: number){
    this.gService
      .updateState('mesas/updateEstadoDesocupada',idMesa)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.respUpdate = data;
      });
  }

  updateEstadoPedidoPorEntregar(idPedido: number) {
    this.gService
      .updateState('pedido/updateEstadoPedidoPorEntregar', idPedido)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.respUpdate = data;
      });
  }

  updateEstadoPedidoPagada(idPedido: number) {
    this.gService
      .updateState('pedido/updateEstadoPedidoPagada', idPedido)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.respUpdate = data;
      });
  }
}
