import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceviewhierarchyComponent } from './instanceviewhierarchy.component';

describe('InstanceviewhierarchyComponent', () => {
  let component: InstanceviewhierarchyComponent;
  let fixture: ComponentFixture<InstanceviewhierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstanceviewhierarchyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceviewhierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
