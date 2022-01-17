import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttablegroupComponent } from './testtablegroup.component';

describe('TesttablegroupComponent', () => {
  let component: TesttablegroupComponent;
  let fixture: ComponentFixture<TesttablegroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesttablegroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesttablegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
