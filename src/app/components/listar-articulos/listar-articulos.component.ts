import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-listar-articulos',
  templateUrl: './listar-articulos.component.html',
  styleUrls: ['./listar-articulos.component.css']
})
export class ListarArticulosComponent implements OnInit {

  listCategorias: any[] = [];

  listProducts: any[] = [];
  allProducts: any;

  constructor(private authService: AuthService,
    private router: Router,
    private menuService: MenuService,
    private toastr: ToastrService) { 
      
    }

    depaTitle = 'DEPARTAMENTO';
    codTitle = 'CODIGO';
  

  ngOnInit(): void {
    // this.obtenerCategorias();
    this.obtenerProductos();

    if (window.innerWidth < 767) {
      this.depaTitle = 'DEPA';
      this.codTitle = 'COD';
    }
    
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
      //console.log(res);
      this.listCategorias = res;
      this.filteredCategorias = res;
      this.listFamilies = Array.from(new Set(res.map(categoria => categoria.FAMILY)));
      this.listDepartamento = Array.from(new Set(res.map(categoria => categoria.DEPARTAMENT))).sort();

      //console.log('Esta es la lista de Departamentos-> '+this.listDepartamento);

      //console.log('Esta es la Familia -> '+this.listFamilies);
      }else{
        console.log('Usuarios No encontrado en la base de Datos');
        this.toastr.error('Error', 'Error al buscar Categorias')
      }
        
    });
  }

  obtenerProductos(){
    this.authService.getProducts().subscribe( (res:any) =>{
      if (!res.error) {
      //console.log(res);
      this.listProducts = res;
      this.allProducts = res;
      console.log(res);

      // this.filteredCategorias = res;
      // this.listFamilies = Array.from(new Set(res.map(categoria => categoria.FAMILY)));
      // this.listDepartamento = Array.from(new Set(res.map(categoria => categoria.DEPARTAMENT))).sort();

      //console.log('Esta es la lista de Departamentos-> '+this.listDepartamento);

      //console.log('Esta es la Familia -> '+this.listFamilies);
      }else{
        console.log('Usuarios No encontrado en la base de Datos');
        this.toastr.error('Error', 'Error al buscar Categorias')
      }
        
    });
  }

  getEvento(categoria: any){
    //('Hicciste click en '+categoria.CATEGORY);
  }

  volver(){
    this.router.navigate(['private']);
    this.menuService.toggleSidenav();
    this.menuService.updateSidenavOpen(true);
  }


  irCrearArticulo(){
    this.router.navigate(['crear-articulo']);
  }

  searchText: string = '';

  filteredProducts() {
    let searchTerm = this.searchText.toLowerCase(); // Convertir el término de búsqueda a minúsculas
    this.listProducts = this.allProducts.filter(producto => {
      let precio = producto.PRECIO.toString(); // Convertir el precio a string para poder buscar
      return producto.CODPRODUCTO.toLowerCase().includes(searchTerm) ||
             producto.DESCRIPCION.toLowerCase().includes(searchTerm) ||
             producto.FAMILY.toLowerCase().includes(searchTerm) ||
             producto.DEPARTAMENT.toLowerCase().includes(searchTerm) ||
             producto.CATEGORY.toLowerCase().includes(searchTerm) ||
             precio.includes(searchTerm);
    });
  }

  onSearchKeyUp(event: any) {
    this.searchText = event.target.value;
    this.filteredProducts();
  }

  editar(){
    this.router.navigate(['editar-articulo']);
  }

  
}