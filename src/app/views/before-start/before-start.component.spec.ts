import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BeforeStartComponent } from './before-start.component';
import { IconComponent } from 'src/app/components/icon/icon.component';
import { ButtonComponent } from 'src/app/components/button/button.component';

describe('BeforeStartComponent', () => {
  let component: BeforeStartComponent;
  let fixture: ComponentFixture<BeforeStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeforeStartComponent, IconComponent, ButtonComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a constructor', () => {
    expect(component.constructor).toBeDefined();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
