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
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/effects/employee.effects';
import { StoreModule } from '@ngrx/store';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { employeeReducer } from './store/reducers/employee.reducers';
import { ToastModule } from 'primeng/toast'; 
import { PanelModule } from 'primeng/panel';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    ReactiveFormsModule,
    EffectsModule.forFeature([EmployeeEffects]),
    StoreModule.forFeature('employee', employeeReducer) ,
    OrganizationChartModule,
    ToastModule, 
    PanelModule, 
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports:[ OrgChartGridComponent,
    OrgChartGraphComponent,
    OrgChartBaseComponent,
    SharedModule],
})
export class FeatureModule { }
