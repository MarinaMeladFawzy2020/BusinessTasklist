import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffresumetaskComponent } from './staffresumetask.component';

describe('StaffresumetaskComponent', () => {
  let component: StaffresumetaskComponent;
  let fixture: ComponentFixture<StaffresumetaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffresumetaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffresumetaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
