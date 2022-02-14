import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StafftaskdetailsComponent } from './stafftaskdetails.component';

describe('StafftaskdetailsComponent', () => {
  let component: StafftaskdetailsComponent;
  let fixture: ComponentFixture<StafftaskdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StafftaskdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StafftaskdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
