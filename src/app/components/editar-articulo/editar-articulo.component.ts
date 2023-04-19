import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { Producto } from 'src/app/Model/Product';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-editar-articulo',
  templateUrl: './editar-articulo.component.html',
  styleUrls: ['./editar-articulo.component.css']
})
export class EditarArticuloComponent implements OnInit {

  form: FormGroup;

  // user = new UserDataCreate('', '', '', '');
  static FAKE: string;

  id:string | null;

  constructor(private authService: AuthService,
    private modalService: ModalServiceService,
              private router: Router,
              private fb: FormBuilder,
              private menuService: MenuService,
              private aRoute: ActivatedRoute,
              private toastr: ToastrService) { 
                this.form = this.fb.group({
                 
                  UNIDAD: ['', Validators.required],
                  DESCRIPCION: ['', Validators.required],
                  TIPOA: ['', Validators.required],
                  // CODCATEGORIA: ['',[Validators.required]],
                  CODLISTA: ['', [Validators.required]],
                  PRECIO: ['', [Validators.required]]
                })
                this.id = this.aRoute.snapshot.paramMap.get('id');
              }
   
   
    

    

  ngOnInit(): void {
    this.getListPrice();
    this.esEditar();
    //this.obtenerDepartamentos();
  }

  @ViewChild('myButton') myButton: ElementRef;

  volverInicio(){
    this.router.navigate(['listar-articulos']);
    // this.menuService.toggleSidenav();
    // this.menuService.updateSidenavOpen(true);
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
        console.log('Categorias no encontrados en la base de Datos');
        
      }
    });
  }

  listPrice: any [] = [];

  getListPrice(){
    this.authService.getPriceList()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          console.log(error.error);
          this.toastr.error('Error', 'No Hay precios');
        } else {
          console.error('Unknown error occurred!');
          this.toastr.error('Error', 'Desconocido');
          console.error(error);
        }
        return throwError(() => error);
    })
    ) .subscribe( (res:any) =>{
      if (res.length >0) {
      //console.log(res);
      this.listPrice = res;
      
      }else{
        console.log('Lista de precios no encontrados en la base de Datos');
        this.toastr.error(`No tiene Lista de precios`, 'Error');
      }
        
    });
  }


  editarArticulo(){
    const PRODUCTO: Producto = {
      DESCRIPCION: this.form.value.DESCRIPCION,
      UNIDAD: this.form.value.UNIDAD,
      TIPOA: this.form.value.TIPOA,
      CODLISTA: this.form.value.CODLISTA,
      PRECIO: this.form.value.PRECIO
    }
    console.log('Este es el producto -> '+PRODUCTO.TIPOA);

    this.authService.updateProductById(this.id, PRODUCTO)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          console.log(error.error);
          if (this.myButton) {
            this.modalService.modalTitle = 'ERROR';
            this.modalService.modalBody = 'ARTICULO: '+PRODUCTO.DESCRIPCION+'. NO Editado!!';
            this.myButton.nativeElement.click();
          }
        } else {
          if (this.myButton) {
            this.modalService.modalTitle = 'ERROR';
            this.modalService.modalBody = 'ARTICULO: '+PRODUCTO.DESCRIPCION+'. NO Editado!!';
            this.myButton.nativeElement.click();
          }
          console.error(error);
        }
        return throwError(() => error);
      })
    )
    .subscribe( (res:any) =>{
      if (!res.error) {
        this.router.navigate(['listar-articulos']); 
        // this.toastr.info('Exito', 'Articulo Actualizado!')
         //Prueba Pop-Up
         if (this.myButton) {
          this.modalService.modalTitle = 'Exito';
          this.modalService.modalBody = 'Ariculo: '+PRODUCTO.DESCRIPCION+'. Editado!!';
          this.myButton.nativeElement.click();
        }
      }else{
        console.log('Articulo No actualizado en la base de Datos');
        // this.toastr.error('Error', 'Error al Actualizar Articulo')
        if (this.myButton) {
          this.modalService.modalTitle = 'ERROR';
          this.modalService.modalBody = 'Ariculo: '+PRODUCTO.DESCRIPCION+'. NO Editado!!';
          this.myButton.nativeElement.click();
        }
      }
        
    });

 
}


soloNumeros(event) {
  const input = event.target.value;
  const charCode = event.which ? event.which : event.keyCode;

  // permitir solo números y un punto después de un número
  if (charCode !== 46 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
  }

  // verificar si ya hay un punto en el valor del input
  if (input.indexOf('.') !== -1 && charCode === 46) {
    event.preventDefault();
  }

  // no permitir punto al principio sin número previo
  if (input === '' && charCode === 46) {
    event.preventDefault();
  }

  // no permitir punto después de otro punto
  if (input.endsWith('.') && charCode === 46) {
    event.preventDefault();
  }

  // Permitir solo dos números después del punto
  if (input.includes('.')) {
    const decimals = input.split('.')[1];
    if (decimals && decimals.length >= 2) {
      event.preventDefault();
    }
  }
}

quitarComa(event) {
  let input = event.target.value;

  // Verificar si el valor del input termina con un punto y no tiene un número después
  if (input.endsWith('.') && input.match(/\d\.\d$/) === null) {
    input = input.slice(0, -1);
  }

  // Verificar si hay un cero después del punto y eliminar el punto y el cero
  if (input.includes('.')) {
    const decimals = input.split('.')[1];
    if (decimals === '0') {
      input = input.split('.')[0];
    }
  }

  // // Agregar un cero al salir del input si hay un número diferente de cero después del punto
  // if (input.includes('.') && !input.endsWith('0.')) {
  //   input += '0';
  // }
    //Agregar un cero al salir del input si hay un número diferente de cero después de la coma
if (input.includes('.')) {
  const [, decimals] = input.split('.');
  if (decimals.length < 2 || (decimals[1] !== '0' && decimals.length != 2)) {
    input += '0';
  }
}

  event.target.value = input;
}

esEditar(){
  if (this.id !== null) {
    this.authService.getProductById(this.id).subscribe(data => {
      this.form.setValue({
        UNIDAD: data.UNIDAD,
        DESCRIPCION: data.DESCRIPCION,
        TIPOA: data.TIPOA,
        CODLISTA: data.CODLISTA,
        PRECIO: data.PRECIO
      })
      //console.log('Data de ACTIVO -->'+data.ACTIVO.data);
    })
  }
}
}