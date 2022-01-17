import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StafftasklistComponent } from './stafftasklist.component';

describe('StafftasklistComponent', () => {
  let component: StafftasklistComponent;
  let fixture: ComponentFixture<StafftasklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StafftasklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StafftasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
