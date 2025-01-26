import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgChartBaseComponent } from './components/org-chart-base/org-chart-base.component';
import { OrgChartGraphComponent } from './components/org-chart-graph/org-chart-graph.component';
import { OrgChartGridComponent } from './components/org-chart-grid/org-chart-grid.component';
import { RouterModule } from '@angular/router';
import { AddReporteeComponent } from './components/add-reportee/add-reportee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteEmployeeComponent } from './components/delete-employee/delete-employee.component';
import { ChangeReportingComponent } from './components/change-reporting/change-reporting.component';



@NgModule({
  declarations: [
    OrgChartBaseComponent,
    OrgChartGraphComponent,
    OrgChartGridComponent,
    AddReporteeComponent,
    DeleteEmployeeComponent,
    ChangeReportingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports:[ OrgChartGridComponent,
    OrgChartGraphComponent,
    OrgChartBaseComponent],
})
export class FeatureModule { }
