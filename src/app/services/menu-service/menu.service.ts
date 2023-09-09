import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { Settings } from '../../models/settings.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private isMenuOpenSubject = new BehaviorSubject<boolean>(false);
  isMenuOpen$ = this.isMenuOpenSubject.asObservable();

  // private settingsSubject = new BehaviorSubject<Settings | null>(null);
  // settings$ = this.settingsSubject.asObservable();

  // private defaultSettings: Settings = {
  //   idioma: "esp",
  //   curso: "3i"
  // }

  constructor() {
    // const storedSettings = localStorage.getItem('settings');
    // if (storedSettings) {
    //   this.settingsSubject.next(JSON.parse(storedSettings));
    // } else {
    //   this.saveSettings(this.defaultSettings);
    // }
  }

  // getSettings(): Settings | null {
  //   return this.settingsSubject.value;
  // }

  // saveSettings(settingsData: Settings) {
  //   localStorage.setItem('settings', JSON.stringify(settingsData));
  //   this.settingsSubject.next(settingsData);
  // }

  // private isBlurActiveSubject = new BehaviorSubject<boolean>(false);
  // isBlurActive$ = this.isBlurActiveSubject.asObservable();


  toggleMenu() {
    this.isMenuOpenSubject.next(!this.isMenuOpenSubject.value);
    // this.getSettings();
    // this.isBlurActiveSubject.next(!this.isBlurActiveSubject.value);
  }

  closeMenu() {
    this.isMenuOpenSubject.next(false);
    // this.isBlurActiveSubject.next(false);
  }
}
