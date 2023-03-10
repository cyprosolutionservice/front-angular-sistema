import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
//import { URL_DEV, URL_PROD } from 'src/global';
import { LoginComponent } from '../components/login/login.component';
import { UserData } from '../Model/UserData';
import { UserDataCreate } from '../Model/UserDataCreate';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://34.176.159.223:3000';
  // private URL = 'http://localhost:3000';

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

  obtenerUsers(){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
        'rut_id': localStorage.getItem('rut')
      })
    };
    return this.http.get(`${this.URL}/user/v1/obtener/usuarios`, httpOptions);
  }

  obtenerUser(id: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
      })
    };
    return this.http.get(`${this.URL}/user/get/${id}`, httpOptions);
  }

  actualizarUser(id: string, user: UserDataCreate): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
      })
    };
    return this.http.put(`${this.URL}/user/edit/${id}`, user,  httpOptions);
  }

  getFamilies(){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
      })
    };
    return this.http.get(`${this.URL}/product/get/family`, httpOptions);
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