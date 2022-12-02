import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-productos-all',
  templateUrl: './productos-all.component.html',
  styleUrls: ['./productos-all.component.css'],
})
export class ProductosAllComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /*   @ViewChild(MatTable) table!: MatTable<any>; */
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'descripcion', 'ingredientes', 'precio', 'idCategoria', 'acciones'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {
    this.listaProductos();
  }

  ngAfterViewInit(): void {
    this.listaProductos();

    //this.table.dataSource = this.datos;
  }
  listaProductos() {
    this.gService
      .list('producto/')
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

  detalleProducto(id: number) {
    this.router.navigate(['/productos', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  actualizarProducto(id: number) {
    this.router.navigate(['/productos/update', id], {
      relativeTo: this.route,
    });
  }

  crearProducto() {
    this.router.navigate(['/productos/create'], {
      relativeTo: this.route,
    });
  }
}
