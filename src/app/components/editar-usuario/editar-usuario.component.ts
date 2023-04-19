import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataCreate } from 'src/app/Model/UserDataCreate';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { XsegundoService } from 'src/app/services/xsegundo-service.service';
import { LoginComponent } from '../login/login.component';
import { MenuComponent } from '../menu/menu.component';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  volverPrivate(){
    this.router.navigate(['private']);  
  }
  form: FormGroup;

  // user = new UserDataCreate('', '', '', '');
  static FAKE: string;

  id:string | null;
  hide = true;

  static editBoton: boolean;


  constructor(private authService: AuthService,
    private modalService: ModalServiceService,
              private router: Router,
              private fb: FormBuilder,
              private menuService: MenuService,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) { 
                this.form = this.fb.group({
                  NOMBRE: ['', Validators.required],
                  APELLIDO: ['', Validators.required],
                  CORREO:['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z][a-zA-Z0-9._-]*[a-zA-Z](\.[a-zA-Z]+)+$/)]],
                  CLAVE: ['', [Validators.required,  Validators.pattern('^[0-9]*$')]],
                  ROL_ID: ['', [Validators.required]],
                  ACTIVO: ['', [Validators.required]]
                  
                })
                this.id = this.aRoute.snapshot.paramMap.get('id');
              }
  ngOnInit(): void {
    this.esEditar();
  }
  @ViewChild('myButton') myButton: ElementRef;
  
  crearUsuario(){
    const USER: UserDataCreate = {
      NOMBRE: this.form.value.NOMBRE,
      APELLIDO: this.form.value.APELLIDO,
      E_MAIL: this.form.value.CORREO,
      CLAVE: this.form.value.CLAVE,
      ROL_ID: this.form.value.ROL_ID,
      ACTIVO: this.form.value.ACTIVO
    }
    //console.log('este es el valor de Clave ->'+USER.CLAVE);
    if (this.id !== null) {
      // Editamos producto
      this.authService.actualizarUser(this.id, USER)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            console.log(error.error);
            if (this.myButton) {
              this.modalService.modalTitle = 'ERROR';
              this.modalService.modalBody = 'USUARIO: '+USER.NOMBRE+'. NO Editado!!';
              this.myButton.nativeElement.click();
            }
          } else {
            if (this.myButton) {
              this.modalService.modalTitle = 'ERROR';
              this.modalService.modalBody = 'USUARIO: '+USER.NOMBRE+'. NO Editado!!';
              this.myButton.nativeElement.click();
            }
            console.error(error);
          }
          return throwError(() => error);
        })
      ).subscribe(data => {
        //this.toastr.info('Actualizacion de USUARIO Completada', '!Usuario Actualizado!')
        this.router.navigate(['listar-usuarios']);
         //Prueba Pop-Up
         if (this.myButton) {
          this.modalService.modalTitle = 'Exito';
          this.modalService.modalBody = 'USUARIO: '+USER.NOMBRE+'. Editado!!';
          this.myButton.nativeElement.click();
        }
        //this.menuService.toggleSidenav();
        //this.menuService.updateSidenavOpen(true);
      })
    }
   
  }


  listRoles: any[] = [
    {value: 'ADMIN', viewValue: 'ADMIN'},
    {value: 'GARZON', viewValue: 'GARZON'},
    {value: 'USUARIO', viewValue: 'USUARIO'},
    {value: 'VENDEDOR', viewValue: 'VENDEDOR'},
  ];
  listEstado: any[] = [
    {value: 1, viewValue: 'ACTIVO'},
    {value: 0, viewValue: 'INACTIVO'}
  ];

  volverInicio(){
    this.router.navigate(['listar-usuarios']);
    this.menuService.toggleSidenav();
    this.menuService.updateSidenavOpen(true);
  }

  esEditar(){
    if (this.id !== null) {
      this.authService.obtenerUser(this.id).subscribe(data => {
        this.form.setValue({
          NOMBRE: data.NOMBRE,
          APELLIDO: data.APELLIDO,
          CORREO: data.E_MAIL,
          CLAVE: data.CLAVE,
          ROL_ID: data.ROL_ID,
          ACTIVO: data.ACTIVO.data
        })
        //console.log('Data de ACTIVO -->'+data.ACTIVO.data);
      })
    }
  }

 password: string;
  showPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}
