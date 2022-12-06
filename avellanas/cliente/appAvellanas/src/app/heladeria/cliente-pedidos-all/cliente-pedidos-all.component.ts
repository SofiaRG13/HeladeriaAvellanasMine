import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cliente-pedidos-all',
  templateUrl: './cliente-pedidos-all.component.html',
  styleUrls: ['./cliente-pedidos-all.component.css'],
})
export class ClientePedidosAllComponent {
  datos: any;
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /*   @ViewChild(MatTable) table!: MatTable<any>; */
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'estado', 'fechaPedido', 'total', 'detalle'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    //Subscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.listaPedidosUsuario();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  listaPedidosUsuario() {
    this.gService
      .get('pedido/getByIdUsuario', this.currentUser.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        //console.log(this.datos);
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  detallePedido(id: number) {
    this.router.navigate(['/pedido', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
