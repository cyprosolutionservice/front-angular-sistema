import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataCreate } from 'src/app/Model/UserDataCreate';
import { AuthService } from 'src/app/services/auth.service';
import { XsegundoService } from 'src/app/services/xsegundo-service.service';
import { LoginComponent } from '../login/login.component';
import { MenuComponent } from '../menu/menu.component';

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
              private router: Router,
              private fb: FormBuilder,
              private segundo: XsegundoService,
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
        this.router.navigate(['private']);
        //EditarUsuarioComponent.editBoton = true;
        // MenuComponent.checkMenu = true;
        this.segundo.toggleSidenav();
        this.segundo.updateSidenavOpen(true);
      }, error => {
        console.log(error),
        // this.form.reset();
        this.toastr.error('Clave Duplicada', 'Operacion Fallida')
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
    this.router.navigate(['private']);
    this.segundo.toggleSidenav();
    this.segundo.updateSidenavOpen(true);
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

 password: string;
  showPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}
