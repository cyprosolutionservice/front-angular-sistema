import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit {

  listCategorias: any[] = [];

  constructor(private authService: AuthService,
    private router: Router,
    private menuService: MenuService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this.authService.getCategorias().subscribe( (res:any) =>{
      if (!res.error) {
      console.log(res);
      this.listCategorias = res;
      }else{
        console.log('Usuarios No encontrado en la base de Datos');
        this.toastr.error('Error', 'Error al buscar Categorias')
      }
        
    });
  }

  getEvento(categoria: any){
    console.log('Hicciste click en '+categoria.CATEGORY);
  }

  volver(){
    this.router.navigate(['private']);
    this.menuService.toggleSidenav();
    this.menuService.updateSidenavOpen(true);
  }

}