import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { Settings } from 'src/app/models/settings.interface';

describe('SettingsServiceService', () => {
  let settingsService: SettingsService;

  const localStorageMock = {
    getItem: (key: string) => (key === 'settings' ? JSON.stringify(storedSettings) : null),
    setItem: (key: string, value: string) => {},
  };

  const storedSettings: Settings = {
    idioma: 'eng',
    curso: '4i',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService],
    });

    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);

    settingsService = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(settingsService).toBeTruthy();
  });

  it('should load stored settings if available', () => {
    const storedSettings: Settings = {
      idioma: 'eng',
      curso: '4i',
    };

    localStorageMock.getItem = (key: string) => JSON.stringify(storedSettings);

    settingsService = TestBed.inject(SettingsService);

    expect(settingsService.getSettings()).toEqual(storedSettings);
  });

  it('should save settings to localStorage', () => {
    const newSettings: Settings = {
      idioma: 'cat',
      curso: '5i',
    };
    settingsService.saveSettings(newSettings);

    expect(localStorage.setItem).toHaveBeenCalledWith('settings', JSON.stringify(newSettings));
  });

  it('should get the current course', () => {
    const settings: Settings = {
      idioma: 'eng',
      curso: '4i',
    };

    settingsService.saveSettings(settings);

    expect(settingsService.getCourse()).toEqual('4i');
  });

});
