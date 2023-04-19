import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { Producto } from 'src/app/Model/Product';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';

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
              private modalService: ModalServiceService,
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

   concatedFamily: string;
   concatedDepa: string;
   concetedCODPRODUCTO: string = "";

  

    onFamilyChange() {
      let selectedFamily = this.form.controls['CODFAMILIA'].value;
      if (selectedFamily) {
        this.concatedFamily = selectedFamily.NOMBRE;
        console.log(this.concatedFamily);
      }
      this.form.controls['CODDEPARTAMENTO'].setValue(null);
      localStorage.setItem('cod-family', selectedFamily.CODFAMILIA);
      this.obtenerDepartamentos();
     
      //console.log(selectedFamily);
     
    }

    depaSelected: string;
    onDepaChange() {
      // let selectedDepa = this.form.controls['CODDEPARTAMENTO'].value;
      const selectedDepartment = this.form.get('CODDEPARTAMENTO').value;
      if (selectedDepartment) {
        this.depaSelected = selectedDepartment.NOMBRE;
        // this.concatedDepa= this.depaSelected[0];
        this.concatedDepa= this.depaSelected.substring(0, 3);
        //console.log(this.depaSelected);
        //console.log(this.concatedDepa);

        //Asignar Valor a CODPRODUCTO
        let palabras = this.concatedFamily.split(" ");
        let codigo = palabras[0][0];
        if (palabras.length >1) {
          let lastFrase = palabras[palabras.length -1]
          codigo += lastFrase[0];
          
        }
        this.concetedCODPRODUCTO = codigo+this.concatedDepa+"-";
        localStorage.setItem('characters-xxx', this.concetedCODPRODUCTO);
        this.getLastCodproduct();

        //console.log(this.concetedCODPRODUCTO)
      }
      this.form.controls['CODCATEGORIA'].setValue('');
      localStorage.setItem('cod-depa', selectedDepartment.CODDEPARTAMENTO);
      this.obtenerCategorias();
    }

    getLastCodproduct(){
      this.authService.getLastCodproduct()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.log(error.error);
            //this.toastr.error('Error', 'COD NO existe');
          } else {
            console.error('CODPRODUCTO error occurred!');
            this.toastr.error('Error', 'Desconocido');
            console.error(error);
          }
          return throwError(() => error);
        })
      )
      .subscribe( (res:any) =>{
        if (res) {
          
        console.log('ESTE ES EL CODPRODUCTO ENCONTRADO ->'+ res.CODPRODUCTO);
       // Extraer el número actual
        const numeroActual = parseInt(res.CODPRODUCTO.split("-")[1]);

        // Calcular el número consecutivo sumándole 1
        const numeroConsecutivo = numeroActual + 1;

        // Obtener la longitud del número consecutivo
        const longitudNumero = numeroConsecutivo.toString().length;

        // Crear la nueva variable con el número consecutivo actualizado
        const nuevoCodigo = `${res.CODPRODUCTO.split("-")[0]}-${numeroConsecutivo.toString().padStart(2, "0")}`;

        //console.log("este es el nuevo codigo -> "+nuevoCodigo); // Output: "VBL-08"

        this.form.get('CODPRODUCTO').setValue(nuevoCodigo);
        this.form.get('CODPRODTEC').setValue(nuevoCodigo);
        // }else if (res.length=0) {
        //   this.concetedCODPRODUCTO += '01';
        
        
        } else{
          console.log("esta es otra forma");
          this.concetedCODPRODUCTO += '01';
          this.form.get('CODPRODUCTO').setValue(this.concetedCODPRODUCTO);
          this.form.get('CODPRODTEC').setValue(this.concetedCODPRODUCTO);
        }
          
      });
    }

    onCategoryChange(){
      const selectedCategory = this.form.get('CODCATEGORIA').value;
      if (selectedCategory) {
        //this.concatedCate = selectedCategory.NOMBRE[0];
        //console.log(this.concatedCate);
       // this.concetedCODPRODUCTO = this.concatedFamily+this.concatedDepa+this.concatedCate+"-";
       // console.log(this.concetedCODPRODUCTO)
      }
    }


    @ViewChild('myButton') myButton: ElementRef;
  ngOnInit(): void {
    this.obtenerFamilias();
    this.getListPrice();
    this.obtenerUnidades();
    this.obtenerTipos();
  }

  volverInicio(){
    this.router.navigate(['listar-articulos']);
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

  listUnits: any [] = [];
  obtenerUnidades(){
    this.authService.getUnits()
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
      this.listUnits = res;

      }
        
    });
  }
  listTypes: any [] = [];
  obtenerTipos(){
    this.authService.getProductType()
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
      this.listTypes = res;
      //console.log(this.listTypes);

      }
        
    });
  }
  

  listCategories: any []= [];
  sinCategoria = {
    "NOMBRE": "SIN CATEGORIA",
    "CODCATEGORIA": null
  };
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
      this.listCategories.unshift(this.sinCategoria);
      
      //console.log('Este es el metodo Departamento->'+res.NOMBRE);
      
      }else if (res) {
        this.toastr.warning("Aviso: Departamento sin categoria", "Advertencia");
        this.listCategories = [];
        this.listCategories.push(this.sinCategoria);
      } else{
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
    let categoriaByRequest: string;

    console.log("Esto es lo que hay categoria vacia ->"+this.form.value.CODCATEGORIA.CODCATEGORIA);
 
    const PRODUCTO: Producto = {
      CODPRODUCTO: this.form.value.CODPRODUCTO,
      CODPRODTEC: this.form.value.CODPRODTEC,
      DESCRIPCION: this.form.value.DESCRIPCION,
      UNIDAD: this.form.value.UNIDAD,
      TIPOA: this.form.value.TIPOA,
      CODFAMILIA: this.form.value.CODFAMILIA.CODFAMILIA,
      CODDEPTO: this.form.value.CODDEPARTAMENTO.CODDEPARTAMENTO,
      CODCATEGORIA: this.form.value.CODCATEGORIA.CODCATEGORIA,
      CODLISTA: this.form.value.CODLISTA,
      PRECIO: this.form.value.PRECIO
    }
    console.log('Este es el producto.CODCATEGORIA -> '+PRODUCTO.CODCATEGORIA);

    this.authService.createProduct(PRODUCTO)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          console.log(error.error);
          if (this.myButton) {
            this.modalService.modalTitle = 'ERROR';
            this.modalService.modalBody = 'Articulo: '+PRODUCTO.DESCRIPCION+'. No fué Creado!!';
            this.myButton.nativeElement.click();
          }
        } else {
          if (this.myButton) {
            this.modalService.modalTitle = 'ERROR';
            this.modalService.modalBody = 'Articulo: '+PRODUCTO.DESCRIPCION+'. No fué Creado!!';
            this.myButton.nativeElement.click();
          }
          console.error(error);
        }
        return throwError(() => error);
      })
    )
    .subscribe( (res:any) =>{
      if (!res.error) {

      //   //Prueba Pop-Up
      // if (this.myButton) {
      //   this.myButton.nativeElement.click();
      // }
       //Prueba Pop-Up
       if (this.myButton) {
        this.modalService.modalTitle = 'Exito';
        this.modalService.modalBody = 'Articulo: '+PRODUCTO.DESCRIPCION+'. Creado!!';
        this.myButton.nativeElement.click();
      }
        this.router.navigate(['listar-articulos']); 
      }else{
        console.log('Articulo No creado en la base de Datos');
        //alert('Error Al Crear Usuario');
        this.toastr.error('Error', 'Error al crear Articulo')
        if (this.myButton) {
          this.modalService.modalTitle = 'ERROR';
          this.modalService.modalBody = 'Articulo: '+PRODUCTO.DESCRIPCION+'. No fué Creado!!';
          this.myButton.nativeElement.click();
        }
        // LoginComponent.botonMenu = false;
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