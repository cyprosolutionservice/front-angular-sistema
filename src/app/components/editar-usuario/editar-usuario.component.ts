import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataCreate } from 'src/app/Model/UserDataCreate';
import { AuthService } from 'src/app/services/auth.service';

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


  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) { 
                this.form = this.fb.group({
                  NOMBRE: ['', Validators.required],
                  APELLIDO: ['', Validators.required],
                  CORREO:['', Validators.required],
                  CLAVE: ['', [Validators.required]],
                  ROL_ID: ['', [Validators.required]],
                  ACTIVO: ['', [Validators.required]]
                  
                })
                this.id = this.aRoute.snapshot.paramMap.get('id');
              }
  ngOnInit(): void {
    this.esEditar();
  }

  crearUsuario(){
    const USER: UserDataCreate = {
      NOMBRE: this.form.value.NOMBRE,
      APELLIDO: this.form.value.APELLIDO,
      E_MAIL: this.form.value.CORREO,
      CLAVE: this.form.value.CLAVE,
      ROL_ID: this.form.value.ROL_ID,
      ACTIVO: this.form.value.ACTIVO
    }
    console.log('este es el valor de Clave ->'+USER.CLAVE);
    if (this.id !== null) {
      // Editamos producto
      this.authService.actualizarUser(this.id, USER).subscribe(data => {
        this.toastr.info('Actualizacion de USUARIO Completada', '!Usuario Actualizado!')
        this.router.navigate(['/']);
      }, error => {
        console.log(error),
        this.form.reset();
        this.toastr.error('Error No se Pudo editar el producto', 'Operacion Fallida')
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
    this.router.navigate(['home']);
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
        console.log('Data de ACTIVO -->'+data.ACTIVO.data);
      })
    }
  }

}