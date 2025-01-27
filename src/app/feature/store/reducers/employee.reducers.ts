import { createReducer, on } from '@ngrx/store';
import {
  loadEmployees, loadEmployeesSuccess, loadEmployeesFailure,
  addReportee, addReporteeSuccess, addReporteeFailure,
  deleteEmployee, deleteEmployeeSuccess, deleteEmployeeFailure,
  changeReportingLine, changeReportingLineSuccess, changeReportingLineFailure,
  clearError
} from '../actions/employee.actions';
import { EmployeeUI } from 'src/app/core/models/employee.model';
import { ActionTypes } from '../actions/actions.type';

export interface EmployeeState {
  employees: EmployeeUI[];
  loading: boolean;
  error: any;
  successAction: ActionTypes | null;
}

export const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  successAction: null,
};

export const employeeReducer = createReducer(
  initialState,

  // Load Employees
  on(loadEmployees, state => ({
    ...state,
    loading: true,
    successAction: null
  })),
  on(loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    loading: false,
    employees,
    error: null,
    successAction: ActionTypes.LoadEmployees
  })),
  on(loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    successAction: null
  })),

  // Add Reportee
  on(addReportee, state => ({
    ...state,
    loading: true,
    successAction: null
  })),
  on(addReporteeSuccess, (state, { updatedEmployees }) => ({
    ...state,
    loading: false,
    employees: updatedEmployees,
    error: null,
    successAction: ActionTypes.AddReportee
  })),
  on(addReporteeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    successAction: null
  })),

  // Delete Employee
  on(deleteEmployee, state => ({
    ...state,
    loading: true,
    successAction: null
  })),
  on(deleteEmployeeSuccess, (state, { updatedEmployees }) => ({
    ...state,
    loading: false,
    employees: updatedEmployees,
    error: null,
    successAction: ActionTypes.DeleteEmployee
  })),
  on(deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    successAction: null
  })),

  // Change Reporting Line
  on(changeReportingLine, state => ({
    ...state,
    loading: true,
    successAction: null,
  })),
  on(changeReportingLineSuccess, (state, { updatedEmployees }) => ({
    ...state,
    loading: false,
    employees: updatedEmployees,
    error: null,
    successAction: ActionTypes.ChangeReportingLine
  })),
  on(changeReportingLineFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    successAction: null
  })),
  on(clearError, (state) => ({ ...state, error: null }))
);
