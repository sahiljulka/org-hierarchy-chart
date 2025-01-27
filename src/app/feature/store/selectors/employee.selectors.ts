import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from '../reducers/employee.reducers';

// Get the feature state
export const selectEmployeeState = createFeatureSelector<EmployeeState>('employee');

// Selector to get the list of employees
export const selectEmployees = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.employees || []
);

// Selector to get the loading status
export const selectLoading = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.loading
);

// Selector to get the error state (if any)
export const selectError = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.error
);


export const selectSuccessAction = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.successAction
)