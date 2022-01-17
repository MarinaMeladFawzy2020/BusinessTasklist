import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancesactionComponent } from './instancesaction.component';

describe('InstancesactionComponent', () => {
  let component: InstancesactionComponent;
  let fixture: ComponentFixture<InstancesactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstancesactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancesactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
