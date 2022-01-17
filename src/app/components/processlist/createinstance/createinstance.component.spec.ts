import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateinstanceComponent } from './createinstance.component';

describe('CreateinstanceComponent', () => {
  let component: CreateinstanceComponent;
  let fixture: ComponentFixture<CreateinstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateinstanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateinstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
