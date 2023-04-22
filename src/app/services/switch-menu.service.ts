import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchMenuService {

  constructor() { }

  switchMenu: boolean = false;

  setSwitchMenu(value: boolean){
    this.switchMenu = value;
  }
}
