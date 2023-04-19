import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-crear-departamento',
  templateUrl: './crear-departamento.component.html',
  styleUrls: ['./crear-departamento.component.css']
})
export class CrearDepartamentoComponent implements OnInit {


  volverPrivate(){
    this.router.navigate(['listar-departamentos']);  
  }
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
                  
                })
              }
  @ViewChild('myButton') myButton: ElementRef;
  ngOnInit(): void {
    this.obtenerFamilias();
  }

  crearDepartamento(){
    const DEP: any = {
      NOMBRE: this.form.value.NOMBRE,
      CODFAMILIA: this.form.value.CODFAMILIA
    }
      this.authService.crearDepartament(DEP)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            console.log(error.error);
            if (this.myButton) {
              this.modalService.modalTitle = 'ERROR';
              this.modalService.modalBody = 'Departamento: '+DEP.NOMBRE+'. NO Creado!!';
              this.myButton.nativeElement.click();
            }
          } else {
            if (this.myButton) {
              this.modalService.modalTitle = 'ERROR';
              this.modalService.modalBody = 'Departamento: '+DEP.NOMBRE+'. NO Creado!!';
              this.myButton.nativeElement.click();
            }
            console.error(error);
          }
          return throwError(() => error);
        })
      )
      .subscribe( (res:any) =>{
        if (!res.error) {
          this.router.navigate(['listar-departamentos']); 
          //Prueba Pop-Up
          if (this.myButton) {
            this.modalService.modalTitle = 'Exito';
            this.modalService.modalBody = 'Departamento: '+DEP.NOMBRE+'. Creado!!';
            this.myButton.nativeElement.click();
          }
          //this.toastr.info('Exito', 'Departamento Creado!')
        }else{
          //this.toastr.error('Error', 'Error al crear Departamento')
          if (this.myButton) {
            this.modalService.modalTitle = 'ERROR';
            this.modalService.modalBody = 'Departamento: '+DEP.NOMBRE+'. NO Creado!!';
            this.myButton.nativeElement.click();
          }
        }
          
      });
 
   
  }
  // listRoles: any[] = [
  //   {value: 'ADMIN', viewValue: 'ADMIN'},
  //   {value: 'GARZON', viewValue: 'GARZON'},
  //   {value: 'USUARIO', viewValue: 'USUARIO'},
  //   {value: 'VENDEDOR', viewValue: 'VENDEDOR'},
  // ];

  volverInicio(){
    this.router.navigate(['listar-departamentos']);
    // this.menuService.toggleSidenav();
    // this.menuService.updateSidenavOpen(true);
  }

  password: string;
  showPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
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

}


