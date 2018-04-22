import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborListComponent } from './labor-list.component';

describe('LaborListComponent', () => {
  let component: LaborListComponent;
  let fixture: ComponentFixture<LaborListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaborListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
