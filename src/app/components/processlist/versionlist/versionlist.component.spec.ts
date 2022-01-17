import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionlistComponent } from './versionlist.component';

describe('VersionlistComponent', () => {
  let component: VersionlistComponent;
  let fixture: ComponentFixture<VersionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
