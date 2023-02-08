import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://34.176.221.186:3000';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  singin(user: any){
    return this.http.post(`${this.URL}/user/singin`, user);
  }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    const fake = LoginComponent.FAKE;
    //console.log('Este es el token->'+fake);
    if(this.jwtHelper.isTokenExpired(fake) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
}