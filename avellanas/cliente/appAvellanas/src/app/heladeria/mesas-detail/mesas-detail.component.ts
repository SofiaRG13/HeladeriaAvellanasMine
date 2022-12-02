import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-mesas-detail',
  templateUrl: './mesas-detail.component.html',
  styleUrls: ['./mesas-detail.component.css'],
})
export class MesasDetailComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  idMesa: number;
  mesaInfo: any;

  constructor(
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
          });
      }
    });
  }

  onBack() {
    this.router.navigate(['/mesas/']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
