import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllreportsComponent } from './allreports.component';

describe('AllreportsComponent', () => {
  let component: AllreportsComponent;
  let fixture: ComponentFixture<AllreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
