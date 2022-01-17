import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltasklisttabsComponent } from './alltasklisttabs.component';

describe('AlltasklisttabsComponent', () => {
  let component: AlltasklisttabsComponent;
  let fixture: ComponentFixture<AlltasklisttabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlltasklisttabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltasklisttabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
