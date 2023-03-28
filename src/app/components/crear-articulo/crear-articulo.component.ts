import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { Producto } from 'src/app/Model/Product';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {

  form: FormGroup;

  // user = new UserDataCreate('', '', '', '');
  static FAKE: string;


  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private menuService: MenuService,
              private toastr: ToastrService) { 
                this.form = this.fb.group({
                  CODPRODUCTO: ['', Validators.required],
                  CODPRODTEC: ['', Validators.required],
                  DESCRIPCION: ['', Validators.required],
                  UNIDAD: ['', Validators.required],
                  TIPOA: ['', Validators.required],
                  CODFAMILIA: ['', [Validators.required]],
                  CODDEPARTAMENTO: ['',[Validators.required]],
                  CODCATEGORIA: ['',[Validators.required]],
                  
                })
              }
   
   
    onFamilyChange() {
      let selectedFamily = this.form.controls['CODFAMILIA'].value;
      this.form.controls['CODDEPARTAMENTO'].setValue(null);
      localStorage.setItem('cod-family', selectedFamily);
      this.obtenerDepartamentos();
     
      //console.log(selectedFamily);
     
    }

    depaSelected: string;
    onDepaChange() {
      // let selectedDepa = this.form.controls['CODDEPARTAMENTO'].value;
      const selectedDepartment = this.form.get('CODDEPARTAMENTO').value;
      if (selectedDepartment) {
        this.depaSelected = selectedDepartment.NOMBRE;
        console.log(this.depaSelected);
      }
      this.form.controls['CODCATEGORIA'].setValue(null);
      localStorage.setItem('cod-depa', selectedDepartment.CODDEPARTAMENTO);
      this.obtenerCategorias();
     
      //console.log(selectedFamily);
    }

  ngOnInit(): void {
    this.obtenerFamilias();
    //this.obtenerDepartamentos();
  }

  volverInicio(){
    this.router.navigate(['listar-articulos']);
    // this.menuService.toggleSidenav();
    // this.menuService.updateSidenavOpen(true);
  }

 
  listFamilies: any[] = [];

  obtenerFamilias(){
    this.authService.getFamilies()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.log(error.error);
          //this.toastr.error('Error', 'Departamento YA existe');
        } else {
          console.error('Family error occurred!');
          this.toastr.error('Error', 'Desconocido');
          console.error(error);
        }
        return throwError(() => error);
      })
    )
    .subscribe( (res:any) =>{
      if (res) {
      //console.log(res);
      this.listFamilies = res;
      }else{
        console.log('Familias No encontrado en la base de Datos');
        this.toastr.error('Error', 'Error al buscar Familias')
      }
        
    });
  }

  listDepartaments: any[] = [];
  

  obtenerDepartamentos(){
    this.authService.getDepartamentsByFamily()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.log(error.error);
          //this.toastr.error('Error', 'Departamento YA existe');
        } else {
          console.error('Unknown error occurred!');
          this.toastr.error('Error', 'Desconocido');
          console.error(error);
        }
        return throwError(() => error);
      })
    )
    .subscribe( (res:any) =>{
      if (res.length >0) {
      //console.log(res);
      this.listDepartaments = res;
      //console.log('Este es el metodo Departamento->'+res.NOMBRE);
      
      }else{
        this.listDepartaments = null;
        console.log('Departamentos no encontrados en la base de Datos');
        this.toastr.error('Familia Sin Departamento', 'Error')
       
      }
        
    });
  }

  listUnidades: string[] =[
    'KG', 'L', 'UN', 'M'
  ]

  listTipos: string[] = [
    'A', 'B', 'C', 'D', 'F', 'V'
  ]

  listCategories: any []= [];
  obtenerCategorias(){
    this.authService.getCategoriesByDepa()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.log(error.error);
          //this.toastr.error('Error', 'Departamento YA existe');
        } else {
          console.error('Unknown error occurred!');
          this.toastr.error('Error', 'Desconocido');
          console.error(error);
        }
        return throwError(() => error);
      })
    )
    .subscribe( (res:any) =>{
      if (res.length >0) {
      //console.log(res);
      this.listCategories = res;
      //console.log('Este es el metodo Departamento->'+res.NOMBRE);
      
      }else{
        this.listDepartaments = null;
        console.log('Categorias no encontrados en la base de Datos');
        this.toastr.error(`Departamento: ${this.depaSelected}. No tiene Categoria`, 'Error');
        this.obtenerDepartamentos();
      }
        
    });
  }

  crearArticulo(){
    const PRODUCTO: Producto = {
      CODPRODUCTO: this.form.value.CODPRODUCTO,
      CODPRODTEC: this.form.value.CODPRODTEC,
      DESCRIPCION: this.form.value.DESCRIPCION,
      UNIDAD: this.form.value.UNIDAD,
      TIPOA: this.form.value.TIPOA,
      CODFAMILIA: this.form.value.CODFAMILIA,
      CODDEPTO: this.form.value.CODDEPARTAMENTO.CODDEPARTAMENTO,
      CODCATEGORIA: this.form.value.CODCATEGORIA
    }
    console.log('Este es el producto -> '+PRODUCTO.TIPOA);

    this.authService.createProduct(PRODUCTO)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          console.log(error.error);
          this.toastr.error('Error', 'Producto YA existe');
        } else {
          console.error('Unknown error occurred!');
          this.toastr.error('Error', 'Desconocido');
          console.error(error);
        }
        return throwError(() => error);
      })
    )
    .subscribe( (res:any) =>{
      if (!res.error) {

        this.router.navigate(['listar-articulos']); 
        // this.menuService.toggleSidenav();
        // this.menuService.updateSidenavOpen(true);
        this.toastr.info('Exito', 'Articulo Creado!')
      }else{
        console.log('Articulo No creado en la base de Datos');
        //alert('Error Al Crear Usuario');
        this.toastr.error('Error', 'Error al crear Articulo')
        // LoginComponent.botonMenu = false;
      }
        
    });

 
}


}