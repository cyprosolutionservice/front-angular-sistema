import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.css']
})
export class TerminosComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  volverLogin(){
    this.router.navigate(['login']);  
  }
}
