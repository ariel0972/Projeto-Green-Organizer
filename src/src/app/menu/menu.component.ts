import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuStatus: string = 'closed';

  menuItems!: Array<Menu>;

  menuClick(): void {
    this.menuStatus = (this.menuStatus == 'open') ? 'closed' : 'open';
  }

  constructor() {
    this.menuItems = new MenuService().getMenu();

  }
}
