import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
//import { URL_DEV, URL_PROD } from 'src/global';
import { LoginComponent } from '../components/login/login.component';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://34.176.159.223:3000';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  singin(user: any){
    return this.http.post(`${this.URL}/user/singin`, user);
  }

  

  singin2(user: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
      })
    };
    return this.http.post(`${this.URL}/user/singin2`, user, httpOptions);
  }

  crearUsuer(user: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
        'rut_id': localStorage.getItem('rut')
      })
    };
    return this.http.post(`${this.URL}/user/create`, user, httpOptions);
  }
  

  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string {
    return localStorage.getItem('token');
  }


}