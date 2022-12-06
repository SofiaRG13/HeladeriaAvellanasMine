import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mesas-all',
  templateUrl: './mesas-all.component.html',
  styleUrls: ['./mesas-all.component.css'],
})
export class MesasAllComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /*   @ViewChild(MatTable) table!: MatTable<any>; */
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'codigo', 'estado', 'capacidad','idRestaurante', 'acciones'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {
    this.listaMesas();
  }

  ngAfterViewInit(): void {
    this.listaMesas();

    //this.table.dataSource = this.datos;
  }
  listaMesas() {
    this.gService
      .list('mesas/')
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

  detalleMesa(id: number) {
    this.router.navigate(['/mesas', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  actualizarMesa(id: number) {
    this.router.navigate(['/mesas/update', id], {
      relativeTo: this.route,
    });
  }

  crearMesa() {
    this.router.navigate(['/mesas-create'], {
      relativeTo: this.route,
    });
  }
}
