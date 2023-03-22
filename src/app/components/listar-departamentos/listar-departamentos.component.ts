import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-listar-departamentos',
  templateUrl: './listar-departamentos.component.html',
  styleUrls: ['./listar-departamentos.component.css']
})
export class ListarDepartamentosComponent implements OnInit {

  listDepartaments: any[] = [];

  constructor(private authService: AuthService,
    private router: Router,
    private menuService: MenuService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerDepartamentos();
    this.obtenerFamilias();
  }

  selectedFamily: string = '';
  filteredDepartamentos: any [] = [];
  listFamilies: any [] = [];

  filtrarDepartamentos() {
    if (this.selectedFamily === 'Todos') {
      this.filteredDepartamentos = this.listDepartaments;
    } else {
      this.filteredDepartamentos = this.listDepartaments.filter(depa => depa.FAMILY === this.selectedFamily);
    }
  }

  obtenerFamilias(){
    this.authService.getFamilies().subscribe( (res:any) =>{
      if (!res.error) {
      console.log(res);
      this.listFamilies = res;
      }else{
        console.log('Familias No encontrado en la base de Datos');
        this.toastr.error('Error', 'Error al buscar Familias')
      }
        
    });
  }
  obtenerDepartamentos(){
    this.authService.getDepartaments()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.log(error.error);
          //this.toastr.error('Error', 'Departamento YA existe');
        } else {
          console.error('Unknown error occurred!');
          this.toastr.error('Error', 'Desconocido');
          console.error(error);
        }
        return throwError(() => error);
      })
    )
    .subscribe( (res:any) =>{
      if (res) {
      //console.log(res);
      this.listDepartaments = res;
      this.filteredDepartamentos = res;
      }else{
        console.log('Departamentos no encontrados en la base de Datos');
        this.toastr.error('Error', 'Error al buscar Departamentos')
      }
        
    });
  }

  getEvento(departamento: any){
    console.log('Hicciste click en '+departamento.NOMBRE);
    // localStorage.setItem('id', user.CODUSUARIO);
  }

  irCrearDepartamento(){
    this.router.navigate(['crear-departamento']);
  }
  volver(){
    this.router.navigate(['private']);
    this.menuService.toggleSidenav();
    this.menuService.updateSidenavOpen(true);
  }

}

