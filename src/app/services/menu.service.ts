import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

   //
   private sidenavOpenSubject = new BehaviorSubject<boolean>(false);
   sidenavOpen$ = this.sidenavOpenSubject.asObservable();
 
   toggleSidenav() {
     this.sidenavOpenSubject.next(!this.sidenavOpenSubject.value);
   }
 
   updateSidenavOpen(open: boolean) {
     this.sidenavOpenSubject.next(open);
   
   }
 //

  constructor() { }
}
