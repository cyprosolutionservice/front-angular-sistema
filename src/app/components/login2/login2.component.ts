import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserData2 } from 'src/app/Model/UserData2';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {


  form: FormGroup;

  user = new UserData2('');
  static FAKE: string;

  static botonMenu: boolean= false;
  static nombreBarra: string= '';
  static CrearUserl2: boolean = false;


  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService) {
                this.form = this.fb.group({
                  CLAVE: ['', [Validators.required]],
                  acceptTerms: [true, [Validators.requiredTrue]]

                })
              }
  ngOnInit(): void {
 
  }

  login2(){
    const USER: UserData2 = {
      // CLAVE: this.form.value.CLAVE
      CLAVE: this.display
    }

    console.log('AQUI ESTA DISPLAY---> '+this.display)

      this.authService.singin2(USER).subscribe( (res:any) =>{
        if (res.token) {
          localStorage.setItem('usuario', res.parsedData.NOMBRE);
          localStorage.setItem('rut', res.parsedData.RUTEMP);
          localStorage.setItem('rol', res.parsedData.ROL_ID);
          let rol_Id =localStorage.getItem('rol');
          if (rol_Id === 'ADMIN') {
            Login2Component.CrearUserl2 = true;
          }
          LoginComponent.botonMenu = true;
          Login2Component.nombreBarra = localStorage.getItem('usuario');
          // console.log('RESPUESTA AQUI ----> '+res);
          LoginComponent.FAKE =res.token;
          // localStorage.setItem('token','eyJhBNJ77fdhx.17$$23terOPOOUGVCVB.rpEYwq.DE_YNhuzxqW');
          localStorage.setItem('token', res.token);
          this.router.navigate(['private']);
          this.toastr.success('¡Login Exitoso!');
        }else{
          console.log('Usuario No encontrado en la base de Datos');
          //alert('Error de clave');
          this.toastr.error('Error', 'Usuario ó Clave incorrectos');
          LoginComponent.botonMenu = false;
        }

      });


  }

  display: string = '';


  handleClick(value: any): void {
    if (value == '.') {
      this.display = '';
    } else {
      this.display += value;
    }
    
    
  }


}