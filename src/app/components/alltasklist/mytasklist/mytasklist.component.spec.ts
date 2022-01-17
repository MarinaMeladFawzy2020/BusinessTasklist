import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytasklistComponent } from './mytasklist.component';

describe('MytasklistComponent', () => {
  let component: MytasklistComponent;
  let fixture: ComponentFixture<MytasklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MytasklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MytasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
