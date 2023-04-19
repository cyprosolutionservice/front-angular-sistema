import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  public modalTitle: string = 'EJECUCION EXITOSA'; // Cambiar la visibilidad a pública
  public modalBody: string = 'Se ha Guardado el Articulo'; // Cambiar la visibilidad a pública


  constructor() { }

  // Método para obtener el título del modal
  getModalTitle(): string {
    return this.modalTitle;
  }

  // Método para obtener el cuerpo del modal
  getModalBody(): string {
    return this.modalBody;
  }

  // Método para establecer el título del modal
  setModalTitle(title: string): void {
    this.modalTitle = title;
  }

  // Método para establecer el cuerpo del modal
  setModalBody(body: string): void {
    this.modalBody = body;
  }
}