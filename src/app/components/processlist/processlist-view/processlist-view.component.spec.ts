import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesslistViewComponent } from './processlist-view.component';

describe('ProcesslistViewComponent', () => {
  let component: ProcesslistViewComponent;
  let fixture: ComponentFixture<ProcesslistViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesslistViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesslistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
