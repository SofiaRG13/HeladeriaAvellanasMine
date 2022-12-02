import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit{
  
  total =0;
  fecha = Date.now();
  qtyItems =0;
  displayedColumns : string [] = ['producto', 'precio', 'cantidad', 'subtotal','acciones']
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
    private noti: NotificacionService,
  ) {
   // this.listaPedidos();
  }
  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe(data=>{
      console.log(data);
      this.dataSource=new MatTableDataSource(data);
    })
    this.total=this.cartService.getTotal();
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
        this.dataSource = new MatTableDataSource( this.datos)
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
       'productos':detalles
     }
     this.gService
     .create('pedido',infoOrden);
     this.noti.mensaje('Pedido',
    'Pedido registrado',
    TipoMessage.success);
    this.cartService.deleteCart();
    this.total=this.cartService.getTotal();
    
    }
    else{
     this.noti.mensaje('Pedido',
     'Agregue productos a la orden',
     TipoMessage.warning);
    }
   }
}