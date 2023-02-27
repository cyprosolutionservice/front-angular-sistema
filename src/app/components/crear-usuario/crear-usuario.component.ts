import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataCreate } from 'src/app/Model/UserDataCreate';
import { AuthService } from 'src/app/services/auth.service';

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

  user = new UserDataCreate('', '', '', '');
  static FAKE: string;


  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService) { 
                this.form = this.fb.group({
                  NOMBRE: ['', Validators.required],
                  APELLIDO: ['', Validators.required],
                  CLAVE: ['', [Validators.required]],
                  ROL_ID: ['', [Validators.required]],
                  
                })
              }
  ngOnInit(): void {
  }

  crearUsuario(){
    const USER: UserDataCreate = {
      NOMBRE: this.form.value.NOMBRE,
      APELLIDO: this.form.value.APELLIDO,
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
    {value: 'OPERACIONES', viewValue: 'OPERACIONES'},
    {value: 'ADMINISTRACION', viewValue: 'ADMINISTRACION'},
  ];

  volverInicio(){
    this.router.navigate(['home']);
  }

}

