import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css'],
})
export class MesasComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  restaurantesList: any;
  currentUser: any;
  idRestaurante: number;
  isMesero: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {
    //Subscribirse para obtener el usuario autenticado
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));

    this.listaRestaurantes();
    this.listaMesas(this.idRestaurante);
  }

  listaMesas(value: number) {
    const userRole = this.currentUser.user.rol;
    if(userRole==="Mesero"){
      this.isMesero=true;
      this.idRestaurante = this.currentUser.user.idRestaurante;
    }else{
      this.idRestaurante = value;
    }
    //Ruta de API
    if (this.idRestaurante !== undefined) {
      this.gService
        .get('restaurante', this.idRestaurante)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log(data);
          this.datos = data.mesas;
        });
    }
  }

  listaRestaurantes() {
    this.restaurantesList = null;
    this.gService
      .list('restaurante')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.restaurantesList = data;
      });
  }

  detalleMesa(id: number) {
    this.router.navigate(['/mesas', id], {
      relativeTo: this.route,
    });
  }
  
  mesaPedido(idMesa:number) {
    this.router.navigate(['/mesas-pedido/', idMesa], {
      relativeTo: this.route,
    });
  }
}
