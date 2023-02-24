import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XsegundoService } from './services/xsegundo-service.service';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrivateComponent } from './components/private/private.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

//Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Providers
import { JwtHelperService } from '@auth0/angular-jwt';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TerminosComponent } from './components/terminos/terminos.component';
import { Login2Component } from './components/login2/login2.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';

//Toastr
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    PrivateComponent,
    TerminosComponent,
    Login2Component,
    CrearUsuarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSelectModule,
    ToastrModule.forRoot()

  ],
  providers: [XsegundoService,
  //JWT
  {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
  JwtHelperService,
  //Token Interceptor
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
