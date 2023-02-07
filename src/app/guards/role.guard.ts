import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { decode } from 'punycode';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    public router: Router){

  }

  
  canActivate(route: ActivatedRouteSnapshot): boolean{
    const expectedRole = route.data['expectedRole'];
    // const token = localStorage.getItem('token');
    const token = LoginComponent.FAKE;

    const deco = decode(token);

    console.log('El Rol es -> ', deco['roleId']);

    if(!this.authService.isAuth() || deco['roleId']!== expectedRole){
      console.log('Usuario No Autorizado');
      alert('No tienes permiso de admin');
      return false
    }
    return true;
  }
  
}

