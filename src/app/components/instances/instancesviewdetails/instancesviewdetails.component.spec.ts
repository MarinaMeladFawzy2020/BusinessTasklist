import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancesviewdetailsComponent } from './instancesviewdetails.component';

describe('InstancesviewdetailsComponent', () => {
  let component: InstancesviewdetailsComponent;
  let fixture: ComponentFixture<InstancesviewdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstancesviewdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancesviewdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
