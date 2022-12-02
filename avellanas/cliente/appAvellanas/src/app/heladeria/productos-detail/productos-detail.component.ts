import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-productos-detail',
  templateUrl: './productos-detail.component.html',
  styleUrls: ['./productos-detail.component.css'],
})
export class ProductosDetailComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  idProducto: number;
  productoInfo: any;

  constructor(
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      //console.log(params);
      this.idProducto = params['id'];
      if (this.idProducto !== undefined) {
        //Obtener producto a mostrar del API
        this.gService
          .get('producto', this.idProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.productoInfo = data;
          });
      }
    });
  }

  onBack() {
    this.router.navigate(['/productos/']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
