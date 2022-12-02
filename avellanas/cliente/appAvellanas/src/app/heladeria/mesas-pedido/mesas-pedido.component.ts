import { Component, OnInit, ViewChild } from '@angular/core';
import { every, single, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductosDetailComponent } from '../productos-detail/productos-detail.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mesas-pedido',
  templateUrl: './mesas-pedido.component.html',
  styleUrls: ['./mesas-pedido.component.css']
})
export class MesasPedidoComponent implements OnInit {
  //productos
  restaurantesList: any;
  idRestaurante: number;

  total =0;
  fecha = Date.now();
  qtyItems =0;
  displayedColumns : string [] = ['producto', 'precio', 'cantidad', 'subtotal','acciones']
  dataSource = new MatTableDataSource<any>();
  datos: any;
  pedidos: any;
  pedido: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  idMesa: number;
  mesaId: number;
  mesaInfo: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private cartService: CartService,
    private dialog:MatDialog,
    private noti: NotificacionService,
    private notificacion: NotificacionService,
    private activeRouter: ActivatedRoute
  ) { 
    this.obtenerMesa();
    //this.obtenerPedido();
    this.listaPedidos();
  }

  ngOnInit(): void {
    //Filtra por id de digita
      this.cartService.currentDataCart$.subscribe(pedido=>{
       console.log(pedido);    
          this.dataSource=new MatTableDataSource(pedido);
      })
      /*this.cartService.currentDataCart$.subscribe(
        pedido=>{
        this.pedido = pedido.filter(id => id.pedido.idMesa)
        console.log(pedido); 
        this.dataSource=new MatTableDataSource(pedido);
       })*/

console.log(this.pedidos); 
    this.total=this.cartService.getTotal();
  }
  numeroMesa(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.pedidos = new MatTableDataSource(this.pedido);;
    //const filterValue = this.idMesa;
    //this.dataSource.filter = filterValue.;
    let pedidof = this.cartService.getItems;
    this.dataSource.filter = filterValue.trim().toUpperCase();
    //this.pedido.filter = filterValue.trim().toUpperCase();
    //if(this.pedido.idMesa == this.idMesa){
     // this.dataSource =new MatTableDataSource(this.pedido);
    //}

  };
  ngAfterViewInit(): void {
    //this.listaPedidos();
    //this.table.dataSource = this.datos;
  }
  /*listaPedidos() {
    this.activeRouter.params.subscribe((params: Params) => {
      //console.log(params);
      this.idMesa = params['id'];
      if (this.idMesa !== undefined) {
        //Obtener producto a mostrar del API
        this.gService
          .get('mesas', this.idMesa)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.pedido = data;
          });
      }
    })
  }*/
 
  detallePedido(id: number) {
    this.activeRouter.params.subscribe((params: Params) => {
      //console.log(params);
      this.idMesa = params['id'];
      if (this.idMesa !== undefined) {
        this.router.navigate(['/pedido/', id], {
          relativeTo: this.route,
        });
      }
    });
  }

  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total=this.cartService.getTotal();
    this.noti.mensaje('Pedido',
    'Cantidad actualizada',
    TipoMessage.success);
  }
  //Metodo que cuando se llama elimina el producto de la lista de pedidos
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total=this.cartService.getTotal();
    this.noti.mensaje('Pedido',
    'Producto eliminado',
    TipoMessage.warning);
  }
  registrarOrden() {
    if(this.cartService.getItems!=null){
     //Obtener todo lo necesario para crear la orden
     let itemsCarrito=this.cartService.getItems;
     let detalles=itemsCarrito.map(
       x=>({
         ['ProductoId']: x.idItem,
         ['cantidad']: x.cantidad
       })
     );
     //Datos para el API
     let infoOrden={
       'fechaPedido':new Date(this.fecha),
       'productos':detalles,
       'mesas': this.idMesa
     }
     this.gService
     .create('pedido',infoOrden);
     this.noti.mensaje('Pedido',
    'Pedido registrado',
    TipoMessage.success);
    this.cartService.deleteCart();
    this.total=this.cartService.getTotal();
     
 
    }else{
     this.noti.mensaje('Pedido',
     'Agregue productos a la orden',
     TipoMessage.warning);
    }
   }
  
  //productos
  detalleProducto(id: number) {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      id:id
    };
    this.dialog.open(ProductosDetailComponent,dialogConfig);
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
            //this.listaPedidos();
          });
      }
    });
  }
  obtenerPedido() {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      //console.log(params);
      this.idMesa = params['id'];
      if (this.idMesa !== undefined) {
        //Obtener producto a mostrar del API
        this.gService
          .get('mesa', this.idMesa)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.dataSource = data;
            this.listaPedidos();
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
  //arreglemen
  comprar(id:number){
    this.gService
    .get("producto",id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      //Agregar Producto obtenido del API al carrito
      this.cartService.addToCart(data);
      //Notificar al usuario
      this.notificacion.mensaje(
        'Pedido',
        'Producto: ' +data.nombre+'agregado al pedido',
        TipoMessage.success
      );
    });
  }
  listaPedidos() {
    
    //Ruta de API
    if (this.mesaId !== undefined) {
      this.gService
        .get('mesas', this.mesaId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log(data);
          this.datos = data.mesas;
        });
    }
  }
  
}
