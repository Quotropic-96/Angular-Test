import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { MenuComponent } from './menu.component';
import { MenuService } from 'src/app/services/menu-service/menu.service';
import { SettingsService } from 'src/app/services/settings-service/settings.service';
import { of } from 'rxjs';
import { Settings } from 'src/app/models/settings.interface';
import { IconComponent } from '../icon/icon.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let menuService: jasmine.SpyObj<MenuService>;
  let settingsService: jasmine.SpyObj<SettingsService>;

  const mockSettings: Settings = {
    idioma: 'es',
    curso: '3i'
  };

  beforeEach(async () => {
    const menuServiceSpy = jasmine.createSpyObj('MenuService', ['closeMenu']);
    const settingsServiceSpy = jasmine.createSpyObj('SettingsService', ['getSettings', 'saveSettings']);
    
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MatSelectModule, BrowserAnimationsModule],
      declarations: [MenuComponent, IconComponent],
      providers: [
        { provide: MenuService, useValue: menuServiceSpy },
        { provide: SettingsService, useValue: settingsServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;

    menuService = TestBed.inject(MenuService) as jasmine.SpyObj<MenuService>;
    settingsService = TestBed.inject(SettingsService) as jasmine.SpyObj<SettingsService>;

    settingsService.getSettings.and.returnValue(mockSettings);
    menuService.isMenuOpen$ = of(false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with settings from SettingsService', () => {
    expect(settingsService.getSettings).toHaveBeenCalled();
    expect(component.settings).toEqual(mockSettings);
  });

  it('should populate settingsForm with settings data', () => {
    const form: FormGroup = component.settingsForm;
    expect(form.get('idioma')?.value).toBe('es');
    expect(form.get('curso')?.value).toBe('3i');
  });

  it('should close menu and refresh settings when closeMenu is called', () => {
    component.closeMenu();
    expect(menuService.closeMenu).toHaveBeenCalled();
    expect(settingsService.getSettings).toHaveBeenCalled();
  });

  it('should submit form successfully and close menu if form is valid', () => {
    component.onSubmit(component.settingsForm);
    expect(settingsService.saveSettings).toHaveBeenCalledWith(mockSettings);
    expect(menuService.closeMenu).toHaveBeenCalled();
  });
});
