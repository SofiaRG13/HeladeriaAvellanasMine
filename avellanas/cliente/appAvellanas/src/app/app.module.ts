import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { HeladeriaModule } from './heladeria/heladeria.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProductosModule } from './productos/productos.module';
import { MesasModule } from './mesas/mesas.module';
import { ReportesModule } from './reportes/reportes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    //Mantener al inicio
    BrowserModule,
    HttpClientModule,
    //Mantener en el medio
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    PedidosModule,
    ProductosModule,
    MesasModule,
    ReportesModule,
    //Mantener al final
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
