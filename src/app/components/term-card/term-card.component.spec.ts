import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TermCardComponent } from './term-card.component';
import { UserTerm, defaultUserTerm } from 'src/app/models/userTerm';
import { IconComponent } from '../icon/icon.component';

describe('TermCardComponent', () => {
  let component: TermCardComponent;
  let fixture: ComponentFixture<TermCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermCardComponent, IconComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use default term when no input is provided', () => {
    expect(component.term).toEqual(defaultUserTerm);
  });

  it('should generate an empty progress path when no sessions are completed', () => {
    const emptyPath = '';
    expect(component.generateProgressPath()).toEqual(emptyPath);
  });

  it('should generate a valid progress path when sessions are completed', () => {
    const testTerm: UserTerm = {
      courseId: '4i',
      termNumber: 2,
      totalSessions: 10,
      completedSessions: 5,
      isCompleted: false
    };
    component.term = testTerm;
    const progressPath = component.generateProgressPath();
    expect(progressPath).not.toEqual('');
    expect(progressPath).toContain('M');
    expect(progressPath).toContain('A');
    expect(progressPath).toContain('L');
    expect(progressPath).toContain('Z');
  });
});
