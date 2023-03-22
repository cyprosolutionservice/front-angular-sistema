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
    private toastr: ToastrService) { 
      
    }
  

  ngOnInit(): void {
    this.obtenerCategorias();
    
  }

 
  listFamilies : any[] = [];
  listDepartamento: any [] = [];

  filteredCategorias: any[] = [];
  selectedFamily: string = '';
  selectedDepartamento: string = '';

  filtrarCategorias() {
    if (this.selectedFamily === 'Todos' && this.selectedDepartamento === 'Todos') {
      this.filteredCategorias = this.listCategorias;
    } else {
      this.filteredCategorias = this.listCategorias.filter(
        categoria =>
          (!this.selectedFamily || this.selectedFamily === 'Todos' || categoria.FAMILY === this.selectedFamily) &&
          (!this.selectedDepartamento || this.selectedDepartamento === 'Todos' || categoria.DEPARTAMENT === this.selectedDepartamento)
      );
    }
  }

  obtenerCategorias(){
    this.authService.getCategorias().subscribe( (res:any) =>{
      if (!res.error) {
      console.log(res);
      this.listCategorias = res;
      this.filteredCategorias = res;
      this.listFamilies = Array.from(new Set(res.map(categoria => categoria.FAMILY)));
      this.listDepartamento = Array.from(new Set(res.map(categoria => categoria.DEPARTAMENT)));
      console.log('Esta es la Familia -> '+this.listFamilies);
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

  irCrearCategoria(){
    this.router.navigate(['crear-categoria']);
  }

}