import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductosDetailComponent } from '../productos-detail/productos-detail.component';
import { CartManyService } from 'src/app/share/cartMany.service';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-mesas-pedido',
  templateUrl: './mesas-pedido.component.html',
  styleUrls: ['./mesas-pedido.component.css'],
})
export class MesasPedidoComponent implements OnInit {
  //productos
  restaurantesList: any;
  idRestaurante: number;

  total = 0;
  impuesto = this.total * 0.13;
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
  idMesa: number;
  mesaInfo: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private cartService: CartManyService,
    private dialog: MatDialog,
    private noti: NotificacionService,
    private notificacion: NotificacionService,
    private activeRouter: ActivatedRoute
  ) {
    this.obtenerMesa();
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
  listaPedidos() {
    this.gService
      .list('pedido')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        console.log(this.datos);
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //this.dataSource = this.datos;
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
        estado: 'Registrada',
        tipoPedido: 'En_Restaurante',
        idMesa: this.mesaInfo.id,
        subtotal: this.total,
        impuesto: this.impuesto,
        descuento: 0,
        total: this.total + this.impuesto,
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

  obtenerMesa() {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      //console.log(params);
      this.idMesa = params['id'];
      if (this.idMesa !== undefined) {
        //Obtener producto a mostrar del API
        this.gService
          .get('mesas', this.idMesa)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.mesaInfo = data;
            this.listaProductos();
          });
      }
    });
  }

  listaProductos() {
    this.idRestaurante = this.mesaInfo.idRestaurante;
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
