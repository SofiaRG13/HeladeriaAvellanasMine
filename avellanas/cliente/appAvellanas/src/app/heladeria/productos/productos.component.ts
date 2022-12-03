import { Component, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { ProductosDetailComponent } from '../productos-detail/productos-detail.component';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  restaurantesList: any;
  idRestaurante: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog:MatDialog,
    private cartService: CartService,
    private notificacion: NotificacionService,
  ) {
    this.listaRestaurantes();
  }

  listaProductos(value: number) {
    this.idRestaurante = value;
    console.log(this.idRestaurante);
    //Ruta de API
    if (this.idRestaurante !== undefined) {
      this.gService
        .get('restaurante', this.idRestaurante)
        //.list('producto/')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log(data);
          this.datos = data.productos;
        });
    }
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

  detalleProducto(id: number) {
    this.router.navigate(['/productos', id], {
      relativeTo: this.route,
    });
  }
}
