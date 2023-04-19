import { Component, OnInit } from '@angular/core';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-modal-pop-up',
  templateUrl: './modal-pop-up.component.html',
  styleUrls: ['./modal-pop-up.component.css']
})
export class ModalPopUpComponent implements OnInit {

  // Se Declaran las variables para el título y el cuerpo del modal
  public modalTitle: string;
  public modalBody: string;

  constructor(public modalService: ModalServiceService) {
     // Asigna los valores iniciales a las variables del modal en el constructor
     this.modalTitle = 'EJECUCION EXITOSA 2';
     this.modalBody = 'Se ha Guardado el Articulo';
   }

  ngOnInit(): void {
  }

}
