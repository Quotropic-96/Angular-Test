import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    fixture.detectChanges();
    expect(component.isPrimary).toEqual(false);
    expect(component.isActive).toEqual(false);
    expect(component.isIcon).toEqual(false);
    expect(component.iconName).toEqual('');
    expect(component.buttonText).toEqual('');
    expect(component.rawToUrl).toEqual('');
  });

  it('should update toUrl on ngOnInit with rawToUrl', () => {
    component.rawToUrl = 'some:route';
    fixture.detectChanges();
    expect(component.toUrl).toEqual(['some', 'route']);
  });

  it('should set toUrl to # when rawToUrl is empty', () => {
    component.rawToUrl = '';
    fixture.detectChanges();
    expect(component.toUrl).toEqual(['#']);
  });

  it('should update toUrl on ngOnInit with single string when rawToUrl has no colon', () => {
    component.rawToUrl = 'route';
    fixture.detectChanges();
    expect(component.toUrl).toEqual(['', 'route']);
  });
});
