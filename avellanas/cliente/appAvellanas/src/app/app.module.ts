import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { HeladeriaModule } from './heladeria/heladeria.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //Mantener al inicio
    BrowserModule,
    HttpClientModule,
    //Mantener en el medio
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    HeladeriaModule,
    //Mantener al final 
    AppRoutingModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, 
    useClass: HttpErrorInterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
