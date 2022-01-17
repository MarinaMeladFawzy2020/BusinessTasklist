import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtasklistComponent } from './searchtasklist.component';

describe('SearchtasklistComponent', () => {
  let component: SearchtasklistComponent;
  let fixture: ComponentFixture<SearchtasklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchtasklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchtasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
