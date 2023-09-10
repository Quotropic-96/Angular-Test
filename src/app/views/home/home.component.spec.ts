import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UserProgressService } from 'src/app/services/user-progress-service/user-progress.service';
import { SettingsService } from 'src/app/services/settings-service/settings.service';
import { MenuService } from 'src/app/services/menu-service/menu.service';
import { Subject, of } from 'rxjs';
import { UserTerm } from 'src/app/models/userTerm';
import { Session } from 'src/app/models/session.interface';
import { Settings } from 'src/app/models/settings.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userProgressService: UserProgressService;
  let settingsService: SettingsService;
  let menuService: MenuService;

  let settingsSubject: Subject<Settings | null>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: UserProgressService,
          useValue: {
            getTermProgressByCourse: jasmine.createSpy().and.returnValue([]),
            getNextSession: jasmine.createSpy(),
          },
        },
        {
          provide: SettingsService,
          useValue: {
            settings$: new Subject<Settings | null>(),
            getCourse: jasmine.createSpy().and.returnValue('4i'),
          },
        },
        {
          provide: MenuService,
          useValue: {
            isBlurActive$: of(false),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userProgressService = TestBed.inject(UserProgressService);
    settingsService = TestBed.inject(SettingsService);
    menuService = TestBed.inject(MenuService);
    settingsSubject = TestBed.inject(SettingsService).settings$ as Subject<Settings | null>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set error message when term progress is empty', () => {
    const getTermProgressSpy =
      userProgressService.getTermProgressByCourse as jasmine.Spy;

    settingsSubject.next({ idioma: 'cat', curso: '3i' });
    fixture.detectChanges();

    expect(component.isError).toBe(true);
    expect(component.errorMessage).toContain('No data found for course 4i');
  });

  // it('should fetch term progress when settings change', () => {
  //   const userTerms: UserTerm[] = []; // Mock user terms
  //   const getTermProgressSpy =
  //     userProgressService.getTermProgressByCourse as jasmine.Spy;
  //   getTermProgressSpy.and.returnValue(userTerms);

  //   settingsSubject.next({ idioma: 'cat', curso: '3i' });
  //   fixture.detectChanges();

  //   expect(component.currentCourse).toBe('4i');
  //   expect(getTermProgressSpy).toHaveBeenCalledWith('4i');
  //   expect(component.terms).toEqual(userTerms);
  // });

  it('should handle error when term progress retrieval fails', () => {
    const getTermProgressSpy = userProgressService.getTermProgressByCourse as jasmine.Spy;
    getTermProgressSpy.calls.reset();
    getTermProgressSpy.and.throwError('Test error');

    settingsSubject.next({ idioma: 'cat', curso: '3i' }); 
    fixture.detectChanges();

    expect(component.isError).toBe(true);
    expect(component.errorMessage).toContain('Could not load your progress');
  });
});
