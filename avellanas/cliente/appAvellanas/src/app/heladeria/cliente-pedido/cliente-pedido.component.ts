import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductosDetailComponent } from '../productos-detail/productos-detail.component';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-cliente-pedido',
  templateUrl: './cliente-pedido.component.html',
  styleUrls: ['./cliente-pedido.component.css'],
})
export class ClientePedidoComponent implements OnInit {
  //productos
  restaurantesList: any;
  idRestaurante: number;

  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  displayedColumns: string[] = [
    'producto',
    'precio',
    'cantidad',
    'notas',
    'subtotal',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private cartService: CartService,
    private dialog: MatDialog,
    private noti: NotificacionService,
    private notificacion: NotificacionService,
    private activeRouter: ActivatedRoute
  ) {
    this.listaRestaurantes();
  }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe((data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.total = this.cartService.getTotal();
  }

  ngAfterViewInit(): void {
    //this.listaPedidos();
    //this.table.dataSource = this.datos;
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

  limpiarCarrito() {
    this.cartService.deleteCart();
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


  detallePedido(id: number) {
    this.router.navigate(['/pedido/', id], {
      relativeTo: this.route,
    });
  }

  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje('Pedido', 'Cantidad actualizada', TipoMessage.success);
  }

  guardarNotas(item: any) {
    this.cartService.addToCart(item);
    this.noti.mensaje('Pedido', 'Notas registradas', TipoMessage.success);
  }

  //Metodo que cuando se llama elimina el producto de la lista de pedidos
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje('Pedido', 'Producto eliminado', TipoMessage.warning);
  }

  registrarOrden() {
    if (this.cartService.getItems != null) {
      //Obtener todo lo necesario para crear la orden
      let itemsCarrito = this.cartService.getItems;
      let detalles = itemsCarrito.map((x) => ({
        ['ProductoId']: x.idItem,
        ['cantidad']: x.cantidad,
      }));
      //Datos para el API
      let infoOrden = {
        fechaPedido: new Date(this.fecha),
        productos: detalles,
      };
      this.gService.create('pedido', infoOrden).subscribe((respuesta: any) => {
        this.noti.mensaje('Pedido', 'Pedido registrado', TipoMessage.success);
        this.cartService.deleteCart();
        this.total = this.cartService.getTotal();
        console.log(respuesta);
      });
    } else {
      this.noti.mensaje(
        'Pedido',
        'Agregue productos a la orden',
        TipoMessage.warning
      );
    }
  }

  //productos
  detalleProducto(id: number) {
    this.router.navigate(['/productos', id], {
      relativeTo: this.route,
    });
  }

  comprar(id: number) {
    this.gService
      .get('producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Agregar Producto obtenido del API al carrito
        this.cartService.addToCart(data);
        //Notificar al usuario
        this.notificacion.mensaje(
          'Pedido',
          'Producto: ' + data.nombre + 'agregado al pedido',
          TipoMessage.success
        );
      });
  }
}
