import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataCreate } from 'src/app/Model/UserDataCreate';
import { AuthService } from 'src/app/services/auth.service';
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
              private segundo: XsegundoService,
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
          this.segundo.toggleSidenav();
          this.segundo.updateSidenavOpen(true);
          this.toastr.info('Exito', 'Usuario Creado!')
        }else{
          console.log('Usuario No encontrado en la base de Datos');
          //alert('Error Al Crear Usuario');
          this.toastr.error('Error', 'Error al crear usuario')
          // LoginComponent.botonMenu = false;
        }
          
      });
 
   
  }
  listRoles: any[] = [
    {value: 'ADMIN', viewValue: 'ADMIN'},
    {value: 'GARZON', viewValue: 'GARZON'},
    {value: 'USUARIO', viewValue: 'USUARIO'},
    {value: 'VENDEDOR', viewValue: 'VENDEDOR'},
  ];

  volverInicio(){
    this.router.navigate(['private']);
    this.segundo.toggleSidenav();
    this.segundo.updateSidenavOpen(true);
  }

  password: string;
  showPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}


