import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout'
import { Observable } from 'rxjs';
import { valorReloj, XsegundoService } from '../../services/xsegundo-service.service';
import { MatMenuListItem } from 'src/app/Model/MatMenulistItem';
import { LoginComponent } from '../login/login.component';
import { Login2Component } from '../login2/login2.component';

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

  boton: boolean = false;

  mobileQuery: MediaQueryList;

  usuario: string;

  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  fillerNav = [
    {name: 'home', route:"", icon:'home'},
    {name: 'contacto', route:"", icon:'perm_contac_calendar'}
  ]

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private segundo: XsegundoService) {
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

      this.totalString =` ${this.dia}, ${this.fecha} ${this.year} ${this.hora}:${this.minutos} ${this.ampm}`;
      console.log(this.totalString);

      this.boton = LoginComponent.botonMenu;
      this.usuario = `Usuario: ${Login2Component.nombreBarra}`;
    });

    this.menuListItems = [
      {menuLinkText: 'Settings', 
      menuIcon: 'settings',
      isDisabled:false},
      {menuLinkText: 'AboutUs',
       menuIcon: 'people',
       isDisabled:false},
      {menuLinkText: 'Help', 
       menuIcon: 'help',
       isDisabled:false},
      {menuLinkText:'Contact',
       menuIcon:'contact',
       isDisabled:true }
];
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;
  menuListItems : MatMenuListItem[];
  selectedMenu:any;

  clickMenuItem(menuItem : MatMenuListItem){
    
    console.log(menuItem);
    this.selectedMenu = menuItem.menuLinkText;
}
}

