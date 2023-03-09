import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from 'src/app/Model/UserData';
import { AuthService } from 'src/app/services/auth.service';

//Toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  static FAKE: string;

  static botonMenu: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      E_MAIL: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z][a-zA-Z0-9._-]*[a-zA-Z](\.[a-zA-Z]+)+$/)]],
      CLAVE: ['', [Validators.required]],
      acceptTerms: [true, [Validators.requiredTrue]]

    })
  }
  ngOnInit(): void {
  }

  login() {
    const USER: UserData = {
      E_MAIL: this.form.value.E_MAIL,
      CLAVE: this.form.value.CLAVE
    }

    this.authService.singin(USER).subscribe((res: any) => {
      if (res.token) {
        console.log('LOGEO1 EXITSOSO!!!');
        LoginComponent.FAKE = res.token;
        localStorage.setItem('DB', res.joinDatabase);
        localStorage.setItem('token', res.token);
        this.router.navigate(['login2']);

      } else {
        console.log('Usuario No encontrado en la base de Datos');
        alert('Error de clave');
      }
    }, error => {
      if (error.status === 401) {
        console.log('Error de Autorizacion 2023');
        this.toastr.error('Error', 'Usuario o Clave incorrectos');
      }
    });
  }

  
 password: string;
 showPassword: boolean = false;

 togglePassword(): void {
   this.showPassword = !this.showPassword;
 }

 hide = true;
}