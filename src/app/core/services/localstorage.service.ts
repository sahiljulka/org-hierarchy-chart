import { Injectable } from '@angular/core';
import { Employee, EmployeeDesignation } from '../models/employee.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {


  private readonly STORAGE_KEY = 'employees';

  constructor() { }

  getEmployees(): Employee[] {
    const employees = localStorage.getItem(this.STORAGE_KEY);
    return employees ? JSON.parse(employees) : [];
  }

  saveEmployees(employees: Employee[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
  }

  addEmployee(employee: Employee): void {
    const employees = this.getEmployees();
    employees.push(employee);
    this.saveEmployees(employees);
  }

  updateEmployee(updatedEmployee: Employee): void {
    let employees = this.getEmployees();
    employees = employees.map(employee =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    this.saveEmployees(employees);
  }

  deleteEmployee(employeeId: string): void {
    let employees = this.getEmployees();
    employees = employees.filter(employee => employee.id !== employeeId);
    this.saveEmployees(employees);
  }

  initializeLocalStorage(): void {
    const employees = this.getEmployees();
    if (employees.length === 0) {
      const defaultEmployees: Employee[] = [
        {
          id: uuidv4(),
          name: 'John Doe',
          designation: EmployeeDesignation.CEO,
          email: 'john.doe@example.com',
          phone: '123-456-7890',
          managerId:null
        }
      ];

      this.saveEmployees(defaultEmployees);
    }
  }
}
