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
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-cliente-pedido',
  templateUrl: './cliente-pedido.component.html',
  styleUrls: ['./cliente-pedido.component.css'],
})
export class ClientePedidoComponent implements OnInit {
  //productos
  restaurantesList: any;
  idRestaurante: number;
  idPedido: number;
  currentUser: any;
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
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.listaRestaurantes();
  }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe((data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.total = this.cartService.getTotal();
    //Subscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
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

  pago() {
    this.gService
      .list('pedido')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        const datosPedido = data;
        let cantidadDatos = datosPedido.length;
        let pedido = datosPedido[cantidadDatos - 1];
        this.idPedido = pedido.id;
        this.router.navigate(['/pago/', this.idPedido], {
          relativeTo: this.route,
        });
      });
  }

  registrarPedido() {
    if (this.cartService.getItems.length > 0) {
      //Obtener todo lo necesario para crear la orden
      let itemsCarrito = this.cartService.getItems;
      let detalles = itemsCarrito.map((x) => ({
        ['ProductoId']: x.idItem,
        ['cantidad']: x.cantidad,
        ['notas']: x.notas,
      }));
      //Datos para el API
      let infoOrden = {
        idUsuario: this.currentUser.user.id,
        estado: 'Registrada',
        tipoPedido: 'En_linea',
        idMesa: null,
        fechaPedido: new Date(this.fecha),
        subtotal: this.total,
        impuesto: this.total * 0.13,
        descuento: 0,
        total: this.total + this.total * 0.13,
        productos: detalles,
      };
      this.gService.create('pedido', infoOrden).subscribe((respuesta: any) => {
        console.log(respuesta);

        var items = this.cartService.getItems;
        items.forEach((p) => {
          //p.idPedido = this.idPedido;
          this.gService
            .create('detallepedido', p)
            .subscribe((respuesta: any) => {
              this.cartService.removeFromCart(p);
              this.total = this.cartService.getTotal();
              this.noti.mensaje(
                'Pedido',
                'Pedido registrado',
                TipoMessage.success
              );
              console.log('Se ha insertado registro en DetallePedido');
            });
        });
        this.pago();
      });
    } else {
      this.noti.mensaje(
        'Pedido',
        'Agregue productos al pedido',
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
        this.total = this.cartService.getTotal();
        //Notificar al usuario
        this.notificacion.mensaje(
          'Pedido',
          'Producto: ' + data.nombre + ' agregado al pedido',
          TipoMessage.success
        );
      });
  }
}
