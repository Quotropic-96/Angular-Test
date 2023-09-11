import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { MenuService } from 'src/app/services/menu-service/menu.service';
import { of } from 'rxjs';
import { IconComponent } from '../icon/icon.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockMenuService: jasmine.SpyObj<MenuService>;

  beforeEach(async () => {
    mockMenuService = jasmine.createSpyObj('MenuService', [
      'toggleMenu',
      'isMenuOpen$',
    ]);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, IconComponent],
      providers: [{ provide: MenuService, useValue: mockMenuService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    mockMenuService.isMenuOpen$ = of(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the menu using menuService', () => {
    component.toggleMenu();
    expect(mockMenuService.toggleMenu).toHaveBeenCalled();
  });

  it('should get the menu open state from menuService', (done: DoneFn) => {
    const testValue = true;
    mockMenuService.isMenuOpen$ = of(testValue);

    component.isMenuOpen().subscribe(result => {
      expect(result).toBe(testValue);
      done();
    });
  });
});
