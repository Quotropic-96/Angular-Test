import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { TermDetailComponent } from './term-detail.component';
import { UserProgressService } from 'src/app/services/user-progress-service/user-progress.service';
import { SettingsService } from 'src/app/services/settings-service/settings.service';
import { MenuService } from 'src/app/services/menu-service/menu.service';
import { of, Subject } from 'rxjs';
import { UserTerm } from 'src/app/models/userTerm';
import { UserSession } from 'src/app/models/userSession.interface';
import { IconComponent } from 'src/app/components/icon/icon.component';
import { TermCardComponent } from 'src/app/components/term-card/term-card.component';
import { SessionCardComponent } from 'src/app/components/session-card/session-card.component';

describe('TermDetailComponent', () => {
  let component: TermDetailComponent;
  let fixture: ComponentFixture<TermDetailComponent>;
  let userProgressService: jasmine.SpyObj<UserProgressService>;
  let settingsService: jasmine.SpyObj<SettingsService>;
  let menuService: jasmine.SpyObj<MenuService>;
  let route: any;
  let location: jasmine.SpyObj<Location>;

  const mockUserTerm: UserTerm = {
    courseId: '5i',
    termNumber: 3,
    totalSessions: 3,
    completedSessions: 1,
    isCompleted: false,
  };

  const mockUserSessions: UserSession[] = [
    {
      sessionId: '5i-3-1',
      sessionNumber: 1,
      sessionTitle: 'Num. 1 del trimestre 3 del curso 5º de Infantil',
      isDone: true,
      isNext: false,
    },
    {
      sessionId: '5i-3-2',
      sessionNumber: 2,
      sessionTitle: 'Num. 2 del trimestre 3 del curso 5º de Infantil',
      isDone: false,
      isNext: true,
    },
    {
      sessionId: '5i-3-13',
      sessionNumber: 3,
      sessionTitle: 'Num. 3 del trimestre 3 del curso 5º de Infantil',
      isDone: false,
      isNext: false,
    },
  ];

  const paramsSubject = new Subject<Params>();

  beforeEach(async () => {
    const userProgressServiceSpy = jasmine.createSpyObj('UserProgressService', [
      'getSingleTermProgress',
      'getSessionsProgressByCourseAndTerm',
    ]);
    const settingsServiceSpy = jasmine.createSpyObj('SettingsService', [
      'getCourse',
    ]);
    const menuServiceSpy = jasmine.createSpyObj('MenuService', [
      'isBlurActive$',
    ]);
    const activatedRouteMock = {
      params: paramsSubject.asObservable(),
    };
    const locationMock = {
      back: jasmine.createSpy('back'),
    };

    await TestBed.configureTestingModule({
      declarations: [TermDetailComponent, IconComponent, TermCardComponent, SessionCardComponent],
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: UserProgressService, useValue: userProgressServiceSpy },
        { provide: SettingsService, useValue: settingsServiceSpy },
        { provide: MenuService, useValue: menuServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Location, useValue: locationMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TermDetailComponent);
    component = fixture.componentInstance;

    userProgressService = TestBed.inject(UserProgressService) as jasmine.SpyObj<UserProgressService>;
    settingsService = TestBed.inject(SettingsService) as jasmine.SpyObj<SettingsService>;
    menuService = TestBed.inject(MenuService) as jasmine.SpyObj<MenuService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;

    settingsService.getCourse.and.returnValue('5i');

    userProgressService.getSingleTermProgress.and.returnValue(mockUserTerm);

    userProgressService.getSessionsProgressByCourseAndTerm.and.returnValue(mockUserSessions);

    menuService.isBlurActive$ = of(false);

    component.courseId = '5i';
    component.termId = 3;
    component.term = mockUserTerm;
    component.sessions = mockUserSessions;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.termId).toBe(3);
    expect(component.term).toEqual(mockUserTerm);
  });

  describe('isBlurActive', () => {
    it('should return the isBlurActive observable from the menu service', () => {
      expect(component.isBlurActive()).toBe(menuService.isBlurActive$);
    });
  });

  describe('error handling', () => {
    it('should handle errors when fetching term progress', () => {
      userProgressService.getSingleTermProgress.and.throwError('An error');
      component.getSingleTermProgress('3i', 1);

      expect(component.isError).toBeTrue();
      expect(component.errorMessage).toBe(
        'Could not fetch progress for term 1. Error: An error'
      );
    });

    it('should handle errors when fetching sessions progress', () => {
      userProgressService.getSessionsProgressByCourseAndTerm.and.throwError(
        'An error'
      );
      component.getSessionsProgressByCourseAndTerm('3i', 1);

      expect(component.isError).toBeTrue();
      expect(component.errorMessage).toBe(
        'Could not fetch sessions for term 1. Error: An error'
      );
    });
  });

  describe('goBack', () => {
    it('should call location.back()', () => {
      component.goBack();
      expect(location.back).toHaveBeenCalled();
    });
  });
});
