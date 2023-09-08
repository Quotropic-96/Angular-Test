import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private menuService: MenuService) {}

  toggleMenu() {
    this.menuService.toggleMenu();
  }

  isMenuOpen() {
    return this.menuService.isMenuOpen$;
  }
}
