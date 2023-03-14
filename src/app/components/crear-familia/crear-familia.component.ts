import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-crear-familia',
  templateUrl: './crear-familia.component.html',
  styleUrls: ['./crear-familia.component.css']
})
export class CrearFamiliaComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private menuService: MenuService,
    private toastr: ToastrService) { 
      this.form = this.fb.group({
        NOMBRE: ['', Validators.required] 
      })
    }

  ngOnInit(): void {
  }

  crearFamilia(){
    const FAMILY: any = {
      NOMBRE: this.form.value.NOMBRE
    }
      this.authService.crearFamilia(FAMILY)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            console.log(error.error);
            this.toastr.error('Error', 'Familia YA existe');
          } else {
            console.error('Unknown error occurred!');
            console.error(error);
          }
          return throwError(() => error);
        })
      ).subscribe( (res:any) =>{
        if (!res.error) {
          // LoginComponent.botonMenu = true;
          console.log('****Entró en el primero***'+res);
          console.log('Familia creada EXITOSAMENTE!')
          this.router.navigate(['private']); 
          this.menuService.toggleSidenav();
          this.menuService.updateSidenavOpen(true);
          this.toastr.info('Exito', 'Familia Creada!')
        }else{
          console.log('Usuario No encontrado en la base de Datos');
          //alert('Error Al Crear Usuario');
          this.toastr.error('Error', 'Error al crear Familia')
          // LoginComponent.botonMenu = false;
        }
          
      });
 
   
  }

  
  volverInicio(){
    this.router.navigate(['private']);
    this.menuService.toggleSidenav();
    this.menuService.updateSidenavOpen(true);
  }

}
