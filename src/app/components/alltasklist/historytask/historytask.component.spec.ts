import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorytaskComponent } from './historytask.component';

describe('HistorytaskComponent', () => {
  let component: HistorytaskComponent;
  let fixture: ComponentFixture<HistorytaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorytaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorytaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
