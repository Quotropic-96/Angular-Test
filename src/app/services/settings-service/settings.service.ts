import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../../models/settings.interface';
import { CourseId } from 'src/app/shared/courseId';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsSubject = new BehaviorSubject<Settings | null>(null);
  settings$ = this.settingsSubject.asObservable();

  private defaultSettings: Settings = {
    idioma: 'esp',
    curso: '3i',
  };

  constructor() {
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
      this.settingsSubject.next(JSON.parse(storedSettings));
    } else {
      this.saveSettings(this.defaultSettings);
    }
  }

  getSettings(): Settings | null {
    return this.settingsSubject.value;
  }

  saveSettings(settingsData: Settings) {
    localStorage.setItem('settings', JSON.stringify(settingsData));
    this.settingsSubject.next(settingsData);
  }

  getCourse(): CourseId {
    const settings = this.getSettings();
    if (settings) {
      return settings.curso;
    } else {
      return this.defaultSettings.curso;
    }
  }
}
