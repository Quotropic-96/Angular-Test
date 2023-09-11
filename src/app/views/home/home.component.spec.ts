import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { UserProgressService } from 'src/app/services/user-progress-service/user-progress.service';
import { SettingsService } from 'src/app/services/settings-service/settings.service';
import { MenuService } from 'src/app/services/menu-service/menu.service';
import { of } from 'rxjs';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { IconComponent } from 'src/app/components/icon/icon.component';
import { TermCardComponent } from 'src/app/components/term-card/term-card.component';
import { Session } from 'src/app/models/session.interface';
import { UserTerm } from 'src/app/models/userTerm';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userProgressService: jasmine.SpyObj<UserProgressService>;
  let settingsService: jasmine.SpyObj<SettingsService>;
  let menuService: jasmine.SpyObj<MenuService>;

  const mockNextSession: Session = {
    _id: '3i-2-3',
    courseId: '3i',
    term: 2,
    sessionNumber: 3,
    title: 'Num. 3 del trimestre 2 del curso 3º de Infantil',
  }

  const mockAfterNextSession : Session = {
    _id: '3i-2-4',
    courseId: '3i',
    term: 2,
    sessionNumber: 4,
    title: 'Num. 4 del trimestre 2 del curso 3º de Infantil',
  }

  const mockRandomSession : Session = {
    _id: '3i-1-1',
    courseId: '3i',
    term: 1,
    sessionNumber: 1,
    title: 'Num. 1 del trimestre 2 del curso 3º de Infantil',
  }

  const mockTermProgress : UserTerm[] = [
    {
      courseId: '3i',
      termNumber: 1,
      totalSessions: 10,
      completedSessions: 10,
      isCompleted: true,
    },
    {
      courseId: '3i',
      termNumber: 2,
      totalSessions: 10,
      completedSessions: 2,
      isCompleted: false,
    },
    {
      courseId: '3i',
      termNumber: 3,
      totalSessions: 10,
      completedSessions: 0,
      isCompleted: false,
    },
  ]

  beforeEach(async () => {
    const userProgressServiceSpy = jasmine.createSpyObj('UserProgressService', ['getNextSession', 'getTermProgressByCourse', 'getAfterNextSession' ,'getRandomSession']);
    const settingsServiceSpy = jasmine.createSpyObj('SettingsService', ['getCourse']);
    const menuServiceSpy = jasmine.createSpyObj('MenuService', ['isBlurActive$']);

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, ButtonComponent, IconComponent, TermCardComponent ],
      providers: [
        { provide: UserProgressService, useValue: userProgressServiceSpy },
        { provide: SettingsService, useValue: settingsServiceSpy },
        { provide: MenuService, useValue: menuServiceSpy }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();

    userProgressService = TestBed.inject(UserProgressService) as jasmine.SpyObj<UserProgressService>;
    settingsService = TestBed.inject(SettingsService) as jasmine.SpyObj<SettingsService>;
    menuService = TestBed.inject(MenuService) as jasmine.SpyObj<MenuService>;

    settingsServiceSpy.getCourse.and.returnValue('3i');

    settingsServiceSpy.settings$ = of({
      curso: '3i',
      idioma: 'esp',
    });

    menuServiceSpy.isBlurActive$ = of(false);

    userProgressServiceSpy.getNextSession.and.returnValue(mockNextSession);

    userProgressServiceSpy.getAfterNextSession.and.returnValue(mockAfterNextSession);

    userProgressServiceSpy.getRandomSession.and.returnValue(mockRandomSession);

    userProgressServiceSpy.getTermProgressByCourse.and.returnValue(mockTermProgress);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set nextSession from userProgressService', () => {
      expect(userProgressService.getNextSession).toHaveBeenCalled();
      expect(component.nextSession).toEqual({
        _id: '3i-2-3',
        courseId: '3i',
        term: 2,
        sessionNumber: 3,
        title: 'Num. 3 del trimestre 2 del curso 3º de Infantil',
      });
    });

    it('should set currentCourse by calling getCurrentCourse', () => {
      expect(settingsService.getCourse).toHaveBeenCalled();
      expect(component.currentCourse).toBe('3i');
    });

    it('should set terms by calling getTermProgress', () => {
      expect(userProgressService.getTermProgressByCourse).toHaveBeenCalledWith('3i');
      expect(component.terms).toEqual([
        {
          courseId: '3i',
          termNumber: 1,
          totalSessions: 10,
          completedSessions: 10,
          isCompleted: true,
        },
        {
          courseId: '3i',
          termNumber: 2,
          totalSessions: 10,
          completedSessions: 2,
          isCompleted: false,
        },
        {
          courseId: '3i',
          termNumber: 3,
          totalSessions: 10,
          completedSessions: 0,
          isCompleted: false,
        },
      ]);
    });
  });

  describe('isBlurActive', () => {
    it('should return the isBlurActive observable from the menu service', () => {
      expect(component.isBlurActive()).toBe(menuService.isBlurActive$);
    });
  });

  describe('error handling in getTermProgress', () => {
    beforeEach(() => {
      userProgressService.getTermProgressByCourse.and.throwError('An error');
      component.getTermProgress('3i');
    });

    it('should set isError to true if an error occurs', () => {
      expect(component.isError).toBeTrue();
    });

    it('should set errorMessage if an error occurs', () => {
      expect(component.errorMessage).toBe('Could not load your progress');
    });
  });
});
