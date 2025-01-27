import { Employee, EmployeeUI } from 'src/app/core/models/employee.model';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actions.type';

// Load Employees
export const loadEmployees = createAction(ActionTypes.LoadEmployees);

export const loadEmployeesSuccess = createAction(
    ActionTypes.LoadEmployeesSuccess,
    props<{ employees: EmployeeUI[] }>()
);

export const loadEmployeesFailure = createAction(
    ActionTypes.LoadEmployeesFailure,
    props<{ error: any }>()
);

// Add Reportee
export const addReportee = createAction(
    ActionTypes.AddReportee,
    props<{ reportee: Employee }>()
);

export const addReporteeSuccess = createAction(
    ActionTypes.AddReporteeSuccess,
    props<{ updatedEmployees: EmployeeUI[] }>()
);

export const addReporteeFailure = createAction(
    ActionTypes.AddReporteeFailure,
    props<{ error: any }>()
);

// Delete Employee
export const deleteEmployee = createAction(
    ActionTypes.DeleteEmployee,
    props<{ employeeId: string }>()
);

export const deleteEmployeeSuccess = createAction(
    ActionTypes.DeleteEmployeeSuccess,
    props<{ updatedEmployees: EmployeeUI[] }>()
);

export const deleteEmployeeFailure = createAction(
    ActionTypes.DeleteEmployeeFailure,
    props<{ error: any }>()
);

// Change Reporting Line
export const changeReportingLine = createAction(
    ActionTypes.ChangeReportingLine,
    props<{ employeeId: string; newManagerId: string }>()
);

export const changeReportingLineSuccess = createAction(
    ActionTypes.ChangeReportingLineSuccess,
    props<{ updatedEmployees: EmployeeUI[] }>()
);

export const changeReportingLineFailure = createAction(
    ActionTypes.ChangeReportingLineFailure,
    props<{ error: any }>()
);

export const clearError=createAction(
    ActionTypes.ClearError
)