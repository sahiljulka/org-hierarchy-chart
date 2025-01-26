import { EmployeeService } from '../../services/employee.service';
import { Employee, EmployeeUI } from './../../../core/models/employee.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-org-chart-base',
  templateUrl: './org-chart-base.component.html',
  styleUrls: ['./org-chart-base.component.scss']
})
export class OrgChartBaseComponent {

  employees: EmployeeUI[] = [];
  showAddReporteeDialog=false
  managerDetails:{managerName:string,managerId:string} = {managerName:'',managerId:""}

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }

  onAddReportee(employeeId:string): void {
    let managerName=this.employees.filter(e=>e.id==employeeId).shift()?.name || ""
    this.managerDetails={managerName:managerName,managerId:employeeId}
    this.showAddReporteeDialog=true
  }

  onEditEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee);
    this.fetchEmployees(); // Refresh the data
  }

  onDeleteEmployee(employeeId: string): void {
    this.employeeService.deleteEmployee(employeeId);
    this.fetchEmployees(); // Refresh the data
  }

  onChangeReportingLine(employeeId: string, newManagerId: string): void {
    this.employeeService.changeReportingLine(employeeId, newManagerId);
    this.fetchEmployees(); // Refresh the data
  }


  modalClose(event:any){
    this.showAddReporteeDialog=false
  }

  saveEmployee(employee:Employee){
    this.employeeService.addEmployee(employee)
    this.showAddReporteeDialog=false
    this.fetchEmployees()
  }
}
