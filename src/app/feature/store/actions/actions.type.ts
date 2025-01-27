export enum ActionTypes {
    // Load Employees
    LoadEmployees = '[Employee] Load Employees',
    LoadEmployeesSuccess = '[Employee] Load Employees Success',
    LoadEmployeesFailure = '[Employee] Load Employees Failure',
  
    // Add Reportee
    AddReportee = '[Employee] Add Reportee',
    AddReporteeSuccess = '[Employee] Add Reportee Success',
    AddReporteeFailure = '[Employee] Add Reportee Failure',
  
    // Delete Employee
    DeleteEmployee = '[Employee] Delete Employee',
    DeleteEmployeeSuccess = '[Employee] Delete Employee Success',
    DeleteEmployeeFailure = '[Employee] Delete Employee Failure',
  
    // Change Reporting Line
    ChangeReportingLine = '[Employee] Change Reporting Line',
    ChangeReportingLineSuccess = '[Employee] Change Reporting Line Success',
    ChangeReportingLineFailure = '[Employee] Change Reporting Line Failure',

    // Clear Error
    ClearError = '[Employee] Clear Error'
  }