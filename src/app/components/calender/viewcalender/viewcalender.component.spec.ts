import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcalenderComponent } from './viewcalender.component';

describe('ViewcalenderComponent', () => {
  let component: ViewcalenderComponent;
  let fixture: ComponentFixture<ViewcalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
