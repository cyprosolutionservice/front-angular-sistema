import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autoservicio',
  templateUrl: './autoservicio.component.html',
  styleUrls: ['./autoservicio.component.css']
})
export class AutoservicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  comidas: any[] = [
    { imagenUrl: '../../../assets/imgs-menu2/pizza-clasica.jpg', titulo: 'Pizza Pepperoni' },
    { imagenUrl: '../../../assets/imgs-menu2/pizza-clasica.jpg', titulo: 'Pizza Clásica' },
    { imagenUrl: '../../../assets/imgs-menu2/hamburgesa-clasica.jpg', titulo: 'Hamburguesa con queso' },
    { imagenUrl: '../../../assets/imgs-menu2/ensalada-cesar.jpg', titulo: 'Ensalada César' },
    { imagenUrl: '../../../assets/imgs-menu2/sushi-variado.jpg', titulo: 'Sushi variado' },
    { imagenUrl: '../../../assets/imgs-menu2/tacos.jpg', titulo: 'Tacos al pastor' }
  ];
}
