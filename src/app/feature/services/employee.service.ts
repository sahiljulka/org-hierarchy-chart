import { LocalstorageService } from './../../core/services/localstorage.service';
import { Employee, EmployeeUI } from './../../core/models/employee.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private localStorageService: LocalstorageService) { }

  getEmployees(): EmployeeUI[] {
    let employees: EmployeeUI[] = []
    let employeesDB: Employee[] = this.localStorageService.getEmployees()
    employeesDB.forEach((employee, index) => {
      let managerName = employeesDB.filter(e => e.id === employee.managerId).shift()?.name
      employees.push({ ...employee, managerName: managerName || "" })
    })
    return employees;
  }

  addEmployee(employee: Employee): void {
    this.localStorageService.addEmployee(employee);
  }

  deleteEmployee(employeeId: string): void {
    const employees = this.localStorageService.getEmployees();
    const employeeToDelete = employees.find(emp => emp.id === employeeId);

    if (employeeToDelete) {
      const managerId = employeeToDelete.managerId;

      // Handle the CEO case, if the deleted employee is the CEO (no manager)
      if (!managerId) {
        // Reassign all reportees of the deleted employee to undefined
        employees.forEach(emp => {
          if (emp.managerId === employeeId) {
            emp.managerId = undefined;  // No manager for the reportee anymore
          }
        });
      } else {
        // Reassign reportees to the manager
        employees.forEach(emp => {
          if (emp.managerId === employeeId) {
            emp.managerId = managerId;  // Reassign the employee's reports to the manager
          }
        });
      }
    }
    
     // Now remove the employee from the list
     const index = employees.findIndex(emp => emp.id === employeeId);
     if (index !== -1) {
       employees.splice(index, 1);  // Remove the employee from the array
     }
 
     // Save the updated employee list
     this.localStorageService.saveEmployees(employees);
  }

  changeReportingLine(employeeId: string, newManagerId: string): boolean {
    const employees = this.localStorageService.getEmployees();

    const employee = employees.find(emp => emp.id === employeeId);
    const newManager = employees.find(emp => emp.id === newManagerId);

    if (employee && newManager) {
      // Check for cycles before changing reporting line
      if (this.hasCycle(employee.id, newManagerId)) {
        alert('Cycle detected! Reporting line change not allowed.');
        return false; // Don't allow the change if there is a cycle
      }

      // If no cycle, proceed to change the manager
      employee.managerId = newManagerId;
      this.localStorageService.saveEmployees(employees);
      return true
    }
    return false
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

  // TODO: helper function
  private hasCycle(employeeId: string, newManagerId: string): boolean {
    let currentManagerId: string | undefined = newManagerId;

    while (currentManagerId) {
      const currentManager = this.getEmployeeById(currentManagerId);

      if (!currentManager) {
        break;
      }

      // If we encounter the employee in the manager's hierarchy, cycle detected
      if (currentManager.id === employeeId) {
        return true;
      }

      // Move to the next manager in the chain
      currentManagerId = currentManager.managerId;
    }

    return false; // No cycle detected
  }

  // TODO: helper function
  private getEmployeeById(employeeId: string): Employee | undefined {
    const employees = this.localStorageService.getEmployees();
    return employees.find(emp => emp.id === employeeId);
  }

}
