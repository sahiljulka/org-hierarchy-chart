import { LocalstorageService } from './../../core/services/localstorage.service';
import { Employee, EmployeeUI } from './../../core/models/employee.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private localStorageService: LocalstorageService) {}

  getEmployees(): EmployeeUI[] {
    let employees:EmployeeUI[]=[]
    let employeesDB:Employee[]=this.localStorageService.getEmployees()
    employeesDB.forEach((employee,index)=>{
      let managerName= employeesDB.filter(e=>e.id===employee.managerId).shift()?.name
      employees.push({...employee,managerName:managerName || ""})
    })
    return employees;
  }

  addEmployee(employee: Employee): void {
    this.localStorageService.addEmployee(employee);
  }

  updateEmployee(updatedEmployee: Employee): void {
    this.localStorageService.updateEmployee(updatedEmployee);
  }

  deleteEmployee(employeeId: string): void {
    this.localStorageService.deleteEmployee(employeeId);
  }

  changeReportingLine(employeeId: string, newManagerId: string): void {
    const employees = this.localStorageService.getEmployees();
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      employee.managerId = newManagerId;
      this.localStorageService.saveEmployees(employees);
    }
  }

  addReportee(managerId: string, reportee: Employee): void {
    const employees = this.localStorageService.getEmployees();
    const manager = employees.find(emp => emp.id === managerId);
    if (manager) {
      reportee.managerId = managerId;
      employees.push(reportee); // Add new reportee
      this.localStorageService.saveEmployees(employees);
    }
  }

}
