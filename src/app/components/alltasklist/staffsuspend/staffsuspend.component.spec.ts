import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsuspendComponent } from './staffsuspend.component';

describe('StaffsuspendComponent', () => {
  let component: StaffsuspendComponent;
  let fixture: ComponentFixture<StaffsuspendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffsuspendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffsuspendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
