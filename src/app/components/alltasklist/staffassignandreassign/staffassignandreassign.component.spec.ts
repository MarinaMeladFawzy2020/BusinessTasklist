import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffassignandreassignComponent } from './staffassignandreassign.component';

describe('StaffassignandreassignComponent', () => {
  let component: StaffassignandreassignComponent;
  let fixture: ComponentFixture<StaffassignandreassignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffassignandreassignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffassignandreassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
