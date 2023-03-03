import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService){
  }

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp > Date.now() / 1000) {
        this.authService.setAuthenticated(true);
        return true;
      }
    }
    //alert('Token Expirado');
    localStorage.setItem('rol', '');
    this.toastr.error('Error', '¡Sesión Expirada!');
    this.authService.setAuthenticated(false);
    this.router.navigate(['/login']);
    return false;
  }

}
