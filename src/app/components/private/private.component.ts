import { Component, OnInit } from '@angular/core';
import { Login2Component } from '../login2/login2.component';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  usuario: string = Login2Component.nombreBarra;
  constructor() { }

  ngOnInit(): void {
  }

}
