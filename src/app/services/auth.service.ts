import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
//import { URL_DEV, URL_PROD } from 'src/global';
import { LoginComponent } from '../components/login/login.component';
import { Producto } from '../Model/Product';
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

  getRoles(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
      })
    };
    return this.http.get(`${this.URL}/user/v1/get/roles`, httpOptions);
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

  crearFamilia(family: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB')
      })
    };
    return this.http.post(`${this.URL}/product/create/family`, family, httpOptions);
  }

  getDepartaments(){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
      })
    };
    return this.http.get(`${this.URL}/product/get/departament`, httpOptions);
  }

  getDepartamentsByFamily(){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
        'cod-family': localStorage.getItem('cod-family')
      })
    };
    return this.http.get(`${this.URL}/product/get/departament/by/family`, httpOptions);
  }

  getCategoriesByDepa(){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
        'cod-depa': localStorage.getItem('cod-depa')
      })
    };
    return this.http.get(`${this.URL}/product/get/categories/by/departaments`, httpOptions);
  }

  crearDepartament(departament: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB')
      })
    };
    return this.http.post(`${this.URL}/product/create/departament`, departament, httpOptions);
  }

  getCategorias(){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
      })
    };
    return this.http.get(`${this.URL}/product/get/categories`, httpOptions);
  }

  createCategory(departament: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB')
      })
    };
    return this.http.post(`${this.URL}/product/create/category`, departament, httpOptions);
  }

  getProducts(){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
      })
    };
    return this.http.get(`${this.URL}/product/get/products`, httpOptions);
  }

  getPriceList(){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB'),
      })
    };
    return this.http.get(`${this.URL}/product/get/pricelist`, httpOptions);
  }

  createProduct(producto: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-db-name': localStorage.getItem('DB')
      })
    };
    return this.http.post(`${this.URL}/product/create/product`, producto, httpOptions);
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