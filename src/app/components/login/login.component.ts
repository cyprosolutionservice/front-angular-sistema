import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from 'src/app/Model/UserData';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  // user = {
  //   userName: 'kevin',
  //   pass: '1234'
  // }
  user = new UserData('', '');
  static FAKE: string;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { 
                this.form = this.fb.group({
                  E_MAIL: ['', Validators.required],
                  CLAVE: ['', [Validators.required]]
                  
                })
              }
  ngOnInit(): void {
  }

  login(){
    const USER: UserData = {
      E_MAIL: this.form.value.E_MAIL,
      CLAVE: this.form.value.CLAVE
    }


      this.authService.singin(USER).subscribe( (res:any) =>{
        if (res.token) {
          //console.log(res);
          LoginComponent.FAKE =res.token;
          localStorage.setItem('token','eyJhBNJ77fdhx.17$$23terOPOOUGVCVB.rpEYwq.DE_YNhuzxqW');
          this.router.navigate(['private']);  
        }else{
          console.log('Usuario No encontrado en la base de Datos');
          alert('Error de clave');
        }
          
      });
 
   
  }

}