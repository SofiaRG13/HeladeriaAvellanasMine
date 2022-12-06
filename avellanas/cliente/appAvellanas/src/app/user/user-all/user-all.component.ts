import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css'],
})
export class UserAllComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /*   @ViewChild(MatTable) table!: MatTable<any>; */
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'apellido1', 'apellido1','email', 'rol','acciones'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {
    this.listaUsuarios();
  }

  ngAfterViewInit(): void {
    this.listaUsuarios();

    //this.table.dataSource = this.datos;
  }
  listaUsuarios() {
    this.gService
      .list('usuario/')
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  actualizarUsuario(id: number) {
    this.router.navigate(['/usuarios/update', id], {
      relativeTo: this.route,
    });
  }

  crearUsuario() {
    this.router.navigate(['/usuarios-create'], {
      relativeTo: this.route,
    });
  }
}
