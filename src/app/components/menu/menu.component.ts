import { Component } from '@angular/core';
import { MenuService } from 'src/app/state-management/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(public menuService: MenuService) {}
}
