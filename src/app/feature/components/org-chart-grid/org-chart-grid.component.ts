import { Employee, EmployeeUI } from './../../../core/models/employee.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-org-chart-grid',
  templateUrl: './org-chart-grid.component.html',
  styleUrls: ['./org-chart-grid.component.scss']
})
export class OrgChartGridComponent {
  @Input() employees: EmployeeUI[] = [];
  @Output() addReportee = new EventEmitter<EmployeeUI>();
  @Output() editEmployee = new EventEmitter<EmployeeUI>();
  @Output() deleteEmployee = new EventEmitter<EmployeeUI>();
  @Output() changeReportingLine = new EventEmitter<EmployeeUI>();

  onAddReportee(manager: EmployeeUI): void {
    this.addReportee.emit(manager);
  }

  onEditEmployee(employee: EmployeeUI): void {
    this.editEmployee.emit(employee);
  }

  onDeleteEmployee(employee: EmployeeUI): void {
    this.deleteEmployee.emit(employee);
  }

  onChangeReportingLine(employee: EmployeeUI): void {
    this.changeReportingLine.emit(employee);
  }
}
