import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout'
import { Observable } from 'rxjs';
import { valorReloj, XsegundoService } from '../../services/xsegundo-service.service';
import { MatMenuListItem } from 'src/app/Model/MatMenulistItem';
import { LoginComponent } from '../login/login.component';
import { Login2Component } from '../login2/login2.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatExpansionPanel } from '@angular/material/expansion';

import { MatSidenav } from '@angular/material/sidenav';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { MenuService } from 'src/app/services/menu.service';

function capitalizeInitials(str: string): string {
  const words = str.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length > 0) {
      words[i] = word[0].toUpperCase() + word.slice(1);
    }
  }

  return words.join(' ');
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {
  //Reloj
  datos$: Observable<valorReloj>;
  hora: number;
  minutos: string;
  dia: string;
  fecha: string;
  ampm: string;
  segundos: string;
  year: number;
  totalString: any;

  // boton: boolean = false;
  boton: boolean = false;
  crearUsuarioMenu: boolean =false;

  isSidenavInitialized: boolean= false;
  static checkMenu: boolean= false;

  mobileQuery: MediaQueryList;

  usuario: string;

  fillerNav = [
    {name: 'home', route:"", icon:'home'},
    {name: 'contacto', route:"", icon:'perm_contac_calendar'}
  ]

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private segundo: XsegundoService,
              private menuService: MenuService,
              private router: Router,
              private toastr: ToastrService,
              ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


  }
  ngOnInit() {
    this.datos$=this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo
      this.year = x.year;

      let tiempo =` ${this.dia}, ${this.fecha} ${this.year} ${this.hora}:${this.minutos} ${this.ampm}`;
      this.totalString = capitalizeInitials(tiempo)

      this.boton = LoginComponent.botonMenu;
      this.crearUsuarioMenu =Login2Component.CrearUserl2;
      this.usuario = Login2Component.nombreBarra;
      if (LoginComponent.botonMenu || EditarUsuarioComponent.editBoton || MenuComponent.checkMenu) {
        this.isSidenavInitialized = true;
      }
      
    });
    this.menuService.sidenavOpen$.subscribe(open => {
      this.sidenavOpen = open;
      if (open) {
        this.sidenav.open();
      } else if( this.sidenav && this.sidenav.close){
        this.sidenav.close();
      }
    });
  }
  

  // ngOnDestroy(): void {
  //   this.mobileQuery.removeListener(this._mobileQueryListener);
  // }

  shouldRun = true;
  menuListItems : MatMenuListItem[];
  selectedMenu:any;

  clickMenuItem(menuItem : MatMenuListItem){
    
    //console.log(menuItem);
    this.selectedMenu = menuItem.menuLinkText;
}

irCrearUsuario(){
  this.router.navigate(['crear-usuario']);
}

irListarUsuarios(){
  this.router.navigate(['listar-usuarios']);
}
irListarFamilias(){
  this.router.navigate(['listar-familias']);
}

logOut(){
  localStorage.removeItem('token');
  localStorage.removeItem('DB');
  localStorage.removeItem('rol');
  localStorage.removeItem('rut');
  localStorage.removeItem('usuario');
  this.router.navigate(['login']);
  LoginComponent.botonMenu = false;
  this.isSidenavInitialized = false;
  MenuComponent.checkMenu = false

  this.toastr.info('Sessión Cerrada!');
}

volverInicio(){
  this.router.navigate(['home']);
}

@ViewChild('panel1') panel1: MatExpansionPanel;

  cerrarPanel() {
    this.panel1.close();
  }

  @ViewChild('panel2') panel2: MatExpansionPanel;

  cerrarPanel2() {
    this.panel2.close();
  }



  @ViewChild('sidenav') sidenav: MatSidenav;
  sidenavOpen: boolean = false;

  irListarDepartamentos(){
    this.router.navigate(['listar-departamentos']);
  }

  irListarCategorias(){
    this.router.navigate(['listar-categorias']);
  }
}



