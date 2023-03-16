import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { UserDataCreate } from 'src/app/Model/UserDataCreate';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { XsegundoService } from 'src/app/services/xsegundo-service.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  volverPrivate(){
    this.router.navigate(['private']);  
  }
  form: FormGroup;

  // user = new UserDataCreate('', '', '', '');
  static FAKE: string;


  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private menuService: MenuService,
              private toastr: ToastrService) { 
                this.form = this.fb.group({
                  NOMBRE: ['', Validators.required],
                  APELLIDO: ['', Validators.required],
                  CORREO:['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z][a-zA-Z0-9._-]*[a-zA-Z](\.[a-zA-Z]+)+$/)]],
                  CLAVE: ['', [Validators.required,  Validators.pattern('^[0-9]*$')]],
                  ROL_ID: ['', [Validators.required]],
                  
                })
              }
  ngOnInit(): void {
    this.getRoles();
  }

  crearUsuario(){
    const USER: UserDataCreate = {
      NOMBRE: this.form.value.NOMBRE,
      APELLIDO: this.form.value.APELLIDO,
      E_MAIL: this.form.value.CORREO,
      CLAVE: this.form.value.CLAVE,
      ROL_ID: this.form.value.ROL_ID
    }
      this.authService.crearUsuer(USER).subscribe( (res:any) =>{
        if (!res.error) {
          // LoginComponent.botonMenu = true;
          console.log(res);
          console.log(USER.ROL_ID);
          console.log('Usuario creado EXITOSAMENTE!')
          this.router.navigate(['private']); 
          this.menuService.toggleSidenav();
          this.menuService.updateSidenavOpen(true);
          this.toastr.info('Exito', 'Usuario Creado!')
        }else{
          console.log('Usuario No encontrado en la base de Datos');
          //alert('Error Al Crear Usuario');
          this.toastr.error('Error', 'Error al crear usuario')
          // LoginComponent.botonMenu = false;
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
    this.router.navigate(['private']);
    this.menuService.toggleSidenav();
    this.menuService.updateSidenavOpen(true);
  }

  password: string;
  showPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  listRoles: any[] = [];

  getRoles(){
    this.authService.getRoles()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.log(error.error);
        } else {
          console.error('Roles error occurred!');
          this.toastr.error('Error', 'Desconocido');
          console.error(error);
        }
        return throwError(() => error);
      })
    )
    .subscribe( (res:any) =>{
      if (res) {
      console.log(res);
      this.listRoles = res;
      }else{
        console.log('Roles No encontrados en la base de Datos');
        this.toastr.error('Error', 'Error al buscar Roles')
      }
        
    });
  }

}


