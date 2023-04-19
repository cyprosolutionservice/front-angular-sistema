import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-crear-familia',
  templateUrl: './crear-familia.component.html',
  styleUrls: ['./crear-familia.component.css']
})
export class CrearFamiliaComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService,
    private modalService: ModalServiceService,
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
  @ViewChild('myButton') myButton: ElementRef;

  crearFamilia(){
    const FAMILY: any = {
      NOMBRE: this.form.value.NOMBRE
    }
      this.authService.crearFamilia(FAMILY)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            console.log(error.error);
            if (this.myButton) {
              this.modalService.modalTitle = 'ERROR';
              this.modalService.modalBody = 'FAMILIA: '+FAMILY.NOMBRE+'. NO Creada!!';
              this.myButton.nativeElement.click();
            }
          } else {
            if (this.myButton) {
              this.modalService.modalTitle = 'ERROR';
              this.modalService.modalBody = 'FAMILIA: '+FAMILY.NOMBRE+'. NO Creada!!';
              this.myButton.nativeElement.click();
            }
            console.error(error);
          }
          return throwError(() => error);
        })
      ).subscribe( (res:any) =>{
        if (!res.error) {
          this.router.navigate(['listar-familias']); 
          
           //Prueba Pop-Up
           if (this.myButton) {
            this.modalService.modalTitle = 'Exito';
            this.modalService.modalBody = 'Familia: '+FAMILY.NOMBRE+'. Creada!!';
            this.myButton.nativeElement.click();
          }
          //this.toastr.info('Exito', 'Familia Creada!')
        }else{
          if (this.myButton) {
            this.modalService.modalTitle = 'ERROR';
            this.modalService.modalBody = 'Familia: '+FAMILY.NOMBRE+'. NO CREADA!!';
            this.myButton.nativeElement.click();
          }
          //this.toastr.error('Error', 'Error al crear Familia')
    
        }
          
      });
 
   
  }

  
  volverInicio(){
    this.router.navigate(['listar-familias']);
    // this.menuService.toggleSidenav();
    // this.menuService.updateSidenavOpen(true);
  }

}
