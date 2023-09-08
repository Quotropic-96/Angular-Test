import { Component } from '@angular/core';
import { MenuService } from 'src/app/state-management/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public menuService: MenuService) {}

  toggleMenu() {
    this.menuService.toggleMenu();
  }
}
