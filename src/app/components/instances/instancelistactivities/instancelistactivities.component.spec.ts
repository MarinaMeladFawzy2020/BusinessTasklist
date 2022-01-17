import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancelistactivitiesComponent } from './instancelistactivities.component';

describe('InstancelistactivitiesComponent', () => {
  let component: InstancelistactivitiesComponent;
  let fixture: ComponentFixture<InstancelistactivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstancelistactivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancelistactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
