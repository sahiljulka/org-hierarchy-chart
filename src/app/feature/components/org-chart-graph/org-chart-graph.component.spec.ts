import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgChartGraphComponent } from './org-chart-graph.component';

describe('OrgChartGraphComponent', () => {
  let component: OrgChartGraphComponent;
  let fixture: ComponentFixture<OrgChartGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgChartGraphComponent]
    });
    fixture = TestBed.createComponent(OrgChartGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
