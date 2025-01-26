import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgChartBaseComponent } from './org-chart-base.component';

describe('OrgChartBaseComponent', () => {
  let component: OrgChartBaseComponent;
  let fixture: ComponentFixture<OrgChartBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgChartBaseComponent]
    });
    fixture = TestBed.createComponent(OrgChartBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
