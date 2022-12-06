import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-pedidos-all',
  templateUrl: './pedidos-all.component.html',
  styleUrls: ['./pedidos-all.component.css']
})
export class PedidosAllComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /*   @ViewChild(MatTable) table!: MatTable<any>; */
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'idUsuario', 'estado','tipoPedido', 'fechaPedido', 'total', 'detalle'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    this.listaPedidos();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  listaPedidos() {
    this.gService
      .list('pedido')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
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


