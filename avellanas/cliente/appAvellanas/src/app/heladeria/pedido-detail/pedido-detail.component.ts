import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedido-detail',
  templateUrl: './pedido-detail.component.html',
  styleUrls: ['./pedido-detail.component.css']
})
//generos - generos
//Shipping - publicar
export class PedidoDetailComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  idPedido:number;
  pedidoInfo:any;
  

  constructor(private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute) {
     
    
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      //console.log(params);
      this.idPedido = params['id'];
      if (this.idPedido !== undefined) {
        //Obtener producto a mostrar del API
        this.gService
          .get('pedido', this.idPedido)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.pedidoInfo = data;
          });
      }
    });
  }
 
  
  onBack() {
    this.router.navigate(['/pedidos/']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}

