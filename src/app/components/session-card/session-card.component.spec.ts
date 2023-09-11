import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SessionCardComponent } from './session-card.component';
import { UserSession, defaultUserSession } from 'src/app/models/userSession.interface';
import { IconComponent } from '../icon/icon.component';

describe('SessionCardComponent', () => {
  let component: SessionCardComponent;
  let fixture: ComponentFixture<SessionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionCardComponent, IconComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use default session when no input is provided', () => {
    expect(component.session).toEqual(defaultUserSession);
  });

  it('should display session information if session input is provided', () => {
    const testSession: UserSession = {
      sessionId: '3i-2-24',
      sessionNumber: 24,
      sessionTitle: 'Num. 24 del trimestre 2 del curso 3º de Infantil',
      isDone: false,
      isNext: true
    };
    component.session = testSession;

    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.session-info p:nth-child(2)'));
    const numberElement = fixture.debugElement.query(By.css('.session-info .session-number'));

    expect(titleElement.nativeElement.textContent).toContain(testSession.sessionTitle);
    expect(numberElement.nativeElement.textContent).toContain(testSession.sessionNumber.toString());
  });
});
