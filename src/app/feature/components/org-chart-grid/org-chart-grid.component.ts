import { Employee, EmployeeUI } from './../../../core/models/employee.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-org-chart-grid',
  templateUrl: './org-chart-grid.component.html',
  styleUrls: ['./org-chart-grid.component.scss']
})
export class OrgChartGridComponent {
  @Input() employees: EmployeeUI[] = [];
  @Output() addReportee = new EventEmitter<string>();
  @Output() editEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<string>();
  @Output() changeReportingLine = new EventEmitter<{ employeeId: string; newManagerId: string }>();

  onAddReportee(managerId: string): void {
    this.addReportee.emit(managerId);
  }

  onEditEmployee(employee: Employee): void {
    this.editEmployee.emit(employee);
  }

  onDeleteEmployee(employeeId: string): void {
    this.deleteEmployee.emit(employeeId);
  }

  onChangeReportingLine(employeeId: string, newManagerId: string): void {
    this.changeReportingLine.emit({ employeeId, newManagerId });
  }
}
