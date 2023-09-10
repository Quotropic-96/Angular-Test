import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  let menuService: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService]
    });
    
    menuService = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(menuService).toBeTruthy();
  });

  it('isMenuOpen should initialize to false', () => {
    menuService.isMenuOpen$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('isMenuOpen should toggle to true when menu is open', () => {
    menuService.toggleMenu();

    menuService.isMenuOpen$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('isMenuOpen should toggle to false when menu is closed', () => {
    menuService.closeMenu();

    menuService.isMenuOpen$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('isBlurActive should initialize to false', () => {
    menuService.isBlurActive$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('isBlurActive should toggle to true when menu is open', () => {
    menuService.toggleMenu();

    menuService.isBlurActive$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('isBlurActive should toggle to false when menu is closed', () => {
    menuService.closeMenu();

    menuService.isBlurActive$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });
});
