import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/Model/Product';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-listar-secciones',
  templateUrl: './listar-secciones.component.html',
  styleUrls: ['./listar-secciones.component.css']
})
export class ListarSeccionesComponent implements OnInit {

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
    this.obtenerSecciones();
    this. obtenerTiposVenta();
  }

 
  listSecciones : any[] = [];
  listTypeSale: any [] = [];

  filteredCategorias: any[] = [];
  selectedFamily: string = '';
  selectedDepartamento: string = '';

  obtenerSecciones(){
    this.authService.getSecciones().subscribe( (res:any) =>{
      if (!res.error) {
      //console.log(res);
      this.listSecciones = res;
      console.log(res);
      }else{
        console.log('Secciones No encontrados en la base de Datos');
        this.toastr.error('Error', 'Error al buscar Categorias')
      }
        
    });
  }

  obtenerTiposVenta(){
    this.authService.getTypeSale().subscribe( (res:any) =>{
      if (!res.error) {
      //console.log(res);
      this.listTypeSale = res;
      console.log(res);
      }else{
        console.log('Secciones No encontrados en la base de Datos');
        this.toastr.error('Error', 'Error al buscar Categorias')
      }
        
    });
  }



  volver(){
    this.router.navigate(['private']);
    this.menuService.toggleSidenav();
    this.menuService.updateSidenavOpen(true);
  }

  crearSeccion(){
    this.router.navigate(['crear-seccion']);

  }




  searchText: string = '';

  filteredProducts() {
    let searchTerm = this.searchText.toLowerCase(); // Convertir el término de búsqueda a minúsculas
    this.listProducts = this.allProducts.filter(producto => {
      let precio: string ='';
      let cate: string = '';
      if (producto.PRECIO != null) {
         precio= producto.PRECIO.toString(); // Convertir el precio a string para poder buscar
      }
      if (producto.CATEGORY != null) {
        cate = producto.CATEGORY.toString();
      }
      
      return producto.CODPRODUCTO.toLowerCase().includes(searchTerm) ||
             producto.DESCRIPCION.toLowerCase().includes(searchTerm) ||
             producto.FAMILY.toLowerCase().includes(searchTerm) ||
             producto.DEPARTAMENT.toLowerCase().includes(searchTerm) ||
            //  producto.CATEGORY.toLowerCase().includes(searchTerm) ||
            cate.includes(searchTerm) ||
             precio.includes(searchTerm);
    });
  }

  onSearchKeyUp(event: any) {
    this.searchText = event.target.value;
    this.filteredProducts();
  }


  editar(producto: Producto){
    this.router.navigate(['editar-articulo', producto.CODPRODUCTO]);
  }

  
}