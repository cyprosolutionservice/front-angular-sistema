import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {

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
      NOMBRE: ['', Validators.required],
      CODFAMILIA: ['', [Validators.required]],
      CODDEPARTAMENTO: ['', [Validators.required]],

    })
  }
  isDepartmentsDisabled = true;

  onFamilyChange() {
    let selectedFamily = this.form.controls['CODFAMILIA'].value;
    this.form.controls['CODDEPARTAMENTO'].setValue(null);
    localStorage.setItem('cod-family', selectedFamily);
    this.obtenerDepartamentos();

    //console.log(selectedFamily);
    this.isDepartmentsDisabled = false;
  }

  @ViewChild('myButton') myButton: ElementRef;
  ngOnInit(): void {
    this.obtenerFamilias();
    //this.obtenerDepartamentos();
  }

  crearCategoria() {
    const CATEGORY: any = {
      NOMBRE: this.form.value.NOMBRE,
      CODFAMILIA: this.form.value.CODFAMILIA,
      CODDEPARTAMENTO: this.form.value.CODDEPARTAMENTO
    }
    this.authService.createCategory(CATEGORY)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            console.log(error.error);
            if (this.myButton) {
              this.modalService.modalTitle = 'ERROR';
              this.modalService.modalBody = 'Categoria: '+CATEGORY.NOMBRE+'. NO Creada!!';
              this.myButton.nativeElement.click();
            }
          } else {
            if (this.myButton) {
              this.modalService.modalTitle = 'ERROR';
              this.modalService.modalBody = 'Categoria: '+CATEGORY.NOMBRE+'. NO Creada!!';
              this.myButton.nativeElement.click();
            }
            console.error(error);
          }
          return throwError(() => error);
        })
      )
      .subscribe((res: any) => {
        if (!res.error) {
          this.router.navigate(['listar-categorias']);
          // this.toastr.info('Exito', 'Categoria Creada!')
          //Prueba Pop-Up
          if (this.myButton) {
            this.modalService.modalTitle = 'Exito';
            this.modalService.modalBody = 'Categoria: '+CATEGORY.NOMBRE+'. Creada!!';
            this.myButton.nativeElement.click();
          }
        } else {
          //this.toastr.error('Error', 'Error al crear Departamento')
          if (this.myButton) {
            this.modalService.modalTitle = 'ERROR';
            this.modalService.modalBody = 'Categoria: '+CATEGORY.NOMBRE+'. NO Creada!!';
            this.myButton.nativeElement.click();
          }
        }

      });


  }

  volverInicio() {
    this.router.navigate(['listar-categorias']);
    // this.menuService.toggleSidenav();
    // this.menuService.updateSidenavOpen(true);
  }

  password: string;
  showPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  listFamilies: any[] = [];

  obtenerFamilias() {
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
      .subscribe((res: any) => {
        if (res) {
          //console.log(res);
          this.listFamilies = res;
        } else {
          console.log('Familias No encontrado en la base de Datos');
          this.toastr.error('Error', 'Error al buscar Familias')
        }

      });
  }

  listDepartaments: any[] = [];


  obtenerDepartamentos() {
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
      .subscribe((res: any) => {
        if (res.length > 0) {

          //console.log(res);
          this.listDepartaments = res;
          //console.log('Este es el metodo Departamento->'+res.NOMBRE);

        } else {
          this.listDepartaments = null;
          console.log('Departamentos no encontrados en la base de Datos');
          this.toastr.error('Familia Sin Departamento', 'Error')
        }

      });
  }

}