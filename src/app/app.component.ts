import { Component } from '@angular/core';
import { SwitchMenuService } from './services/switch-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema Cypro';

  constructor(public menuService: SwitchMenuService) {}
  
}
