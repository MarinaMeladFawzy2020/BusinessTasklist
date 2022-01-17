import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffactivityassigneduserComponent } from './staffactivityassigneduser.component';

describe('StaffactivityassigneduserComponent', () => {
  let component: StaffactivityassigneduserComponent;
  let fixture: ComponentFixture<StaffactivityassigneduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffactivityassigneduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffactivityassigneduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
