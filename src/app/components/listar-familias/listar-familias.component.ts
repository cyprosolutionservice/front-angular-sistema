import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-listar-familias',
  templateUrl: './listar-familias.component.html',
  styleUrls: ['./listar-familias.component.css']
})
export class ListarFamiliasComponent implements OnInit {

  listFamilies: any[] = [];

  constructor(private authService: AuthService,
    private router: Router,
    private menuService: MenuService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerFamilias();
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

  getEvento(familia: any){
    console.log('Hicciste click en '+familia.NOMBRE);
    // localStorage.setItem('id', user.CODUSUARIO);
  }

  irCrearFamilia(){
    this.router.navigate(['crear-familia']);
  }
  volver(){
    this.router.navigate(['private']);
    this.menuService.toggleSidenav();
    this.menuService.updateSidenavOpen(true);
  }

}
