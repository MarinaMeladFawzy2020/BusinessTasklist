import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceslistComponent } from './instanceslist.component';

describe('InstanceslistComponent', () => {
  let component: InstanceslistComponent;
  let fixture: ComponentFixture<InstanceslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstanceslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
