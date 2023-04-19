import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { UserDataCreate } from 'src/app/Model/UserDataCreate';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
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
    private modalService: ModalServiceService,
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

  
  @ViewChild('myButton') myButton: ElementRef;

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
          this.router.navigate(['listar-usuarios']); 
           //Prueba Pop-Up
           if (this.myButton) {
            this.modalService.modalTitle = 'Exito';
            this.modalService.modalBody = 'Usuario: '+USER.NOMBRE+'. Creado!!';
            this.myButton.nativeElement.click();
          }
          //this.toastr.info('Exito', 'Usuario Creado!')
        }else{
         //this.toastr.error('Error', 'Error al crear usuario')
         if (this.myButton) {
          this.modalService.modalTitle = 'ERROR';
          this.modalService.modalBody = 'Usuario: '+USER.NOMBRE+'. NO Creado!!';
          this.myButton.nativeElement.click();
        }
        }
          
      });
 
   
  }


  volverInicio(){
    this.router.navigate(['listar-usuarios']);
    // this.menuService.toggleSidenav();
    // this.menuService.updateSidenavOpen(true);
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
      //console.log(res);
      this.listRoles = res;
      }else{
        console.log('Roles No encontrados en la base de Datos');
        this.toastr.error('Error', 'Error al buscar Roles')
      }
        
    });
  }

}


