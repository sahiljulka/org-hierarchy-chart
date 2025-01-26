import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeReportingComponent } from './change-reporting.component';

describe('ChangeReportingComponent', () => {
  let component: ChangeReportingComponent;
  let fixture: ComponentFixture<ChangeReportingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeReportingComponent]
    });
    fixture = TestBed.createComponent(ChangeReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
