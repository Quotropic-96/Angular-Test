import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Settings } from 'src/app/models/settings.interface';
import { MenuService } from 'src/app/services/menu-service/menu.service';
import { SettingsService } from 'src/app/services/settings-service/settings.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  settingsForm: FormGroup = new FormGroup({
    idioma: new FormControl(''),
    curso: new FormControl(''),
  });

  isError: boolean = false;
  errorMessage: string = '';
  settings: Settings | null = null;

  constructor(
    private menuService: MenuService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.getSettings();
  }

  getSettings(): void {
    this.settings = this.settingsService.getSettings();
    if (this.settings) {
      this.settingsForm.patchValue(this.settings);
    } else {
      this.isError = true;
      this.errorMessage = 'Could not load menu';
    }
  }

  onSubmit(form: FormGroup) : void {
    console.log(form)
    if (form.valid) {
      const formData: Settings = form.value;
      this.settingsService.saveSettings(formData);
      this.closeMenu();
    } else {
      this.isError = true;
      this.errorMessage = 'Input valid values';
    }
  }

  closeMenu() : void {
    this.menuService.closeMenu();
    this.getSettings();
  }

  isMenuOpen() {
    return this.menuService.isMenuOpen$;
  }
}
