import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgChartBaseComponent } from './feature/components/org-chart-base/org-chart-base.component';
import { OrgChartGraphComponent } from './feature/components/org-chart-graph/org-chart-graph.component';
import { OrgChartGridComponent } from './feature/components/org-chart-grid/org-chart-grid.component';

export const routes: Routes = [
  { path: '', redirectTo: '/org-chart/table-view', pathMatch: 'full' },
  {
    path: 'org-chart',
    component: OrgChartBaseComponent,
    children: [
      { path: '', redirectTo: 'table-view', pathMatch: 'full' },
      { path: 'graph-view', component: OrgChartGraphComponent },
      { path: 'table-view', component: OrgChartGridComponent },
    ]
  },
  { path: '**', redirectTo: '/org-chart/table-view', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
