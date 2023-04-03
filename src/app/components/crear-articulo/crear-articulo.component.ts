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
                  CODLISTA: ['', [Validators.required]],
                  // PRECIO: ['', [Validators.required,  Validators.pattern('^[0-9]*$')]]
                  PRECIO: ['', [Validators.required]]
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
    this.getListPrice();
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
        this.listDepartaments = null;
        console.log('Lista de precios no encontrados en la base de Datos');
        this.toastr.error(`No tiene Lista de precios`, 'Error');
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
      CODCATEGORIA: this.form.value.CODCATEGORIA,
      CODLISTA: this.form.value.CODLISTA,
      PRECIO: this.form.value.PRECIO
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

// soloNumeros(event) {
//   const charCode = event.which ? event.which : event.keyCode;
//   if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
//     event.preventDefault();
//   }
// }

// soloNumeros(event) {
//   const input = event.target.value;
//   const charCode = event.which ? event.which : event.keyCode;
  
//   // permitir solo números y una coma después de un número
//   if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
//     event.preventDefault();
//   }
  
//   // verificar si ya hay una coma en el valor del input
//   if (input.indexOf(',') !== -1 && charCode === 44) {
//     event.preventDefault();
//   }
  
//   // no permitir coma al principio sin número previo
//   if (input === '' && charCode === 44) {
//     event.preventDefault();
//   }
  
//   // no permitir coma después de otra coma
//   if (input.endsWith(',') && charCode === 44) {
//     event.preventDefault();
//   }
// }

// quitarComa(event) {
//   const input = event.target.value;
  
//   // verificar si el valor del input termina con una coma y no tiene un número después
//   if (input.endsWith(',') && input.match(/\d,\d$/) === null) {
//     event.target.value = input.slice(0, -1);
//   }
// }

// soloNumeros(event) {
//   const input = event.target.value;
//   const charCode = event.which ? event.which : event.keyCode;
  
//   // permitir solo números y una coma después de un número
//   if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
//     event.preventDefault();
//   }
  
//   // verificar si ya hay una coma en el valor del input
//   if (input.indexOf(',') !== -1 && charCode === 44) {
//     event.preventDefault();
//   }
  
//   // no permitir coma al principio sin número previo
//   if (input === '' && charCode === 44) {
//     event.preventDefault();
//   }
  
//   // no permitir coma después de otra coma
//   if (input.endsWith(',') && charCode === 44) {
//     event.preventDefault();
//   }

//   // Permitir solo dos números después de la coma
//   if (input.includes(',')) {
//     const decimals = input.split(',')[1];
//     if (decimals && decimals.length >= 2) {
//       event.preventDefault();
//     }
//   }
// }

// quitarComa(event) {
//   let input = event.target.value;
  
//   // Verificar si el valor del input termina con una coma y no tiene un número después
//   if (input.endsWith(',') && input.match(/\d,\d$/) === null) {
//     input = input.slice(0, -1);
//   }

//   // Verificar si hay un cero después de la coma y eliminar la coma y el cero
//   if (input.includes(',')) {
//     const decimals = input.split(',')[1];
//     if (decimals === '0') {
//       input = input.split(',')[0];
//     }
//   }

//   // // Agregar un cero al salir del input si hay un número diferente de cero después de la coma
//   // if (input.includes(',') && !input.endsWith('0,')) {
//   //   input += '0';
//   // }
//   // Agregar un cero al salir del input si hay un número diferente de cero después de la coma
// if (input.includes(',')) {
//   const [, decimals] = input.split(',');
//   if (decimals.length < 2 || (decimals[1] !== '0' && decimals.length != 2)) {
//     input += '0';
//   }
// }

//   event.target.value = input;
// }

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
}