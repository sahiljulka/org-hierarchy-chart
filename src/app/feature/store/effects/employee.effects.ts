import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EmployeeService } from '../../services/employee.service';
import {
    addReportee,
    addReporteeSuccess,
    addReporteeFailure,
    deleteEmployee,
    deleteEmployeeSuccess,
    deleteEmployeeFailure,
    changeReportingLine,
    changeReportingLineSuccess,
    changeReportingLineFailure,
    loadEmployees,
    loadEmployeesSuccess,
    loadEmployeesFailure
} from '../actions/employee.actions';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeEffects {
    constructor(
        private actions$: Actions,
        private employeeService: EmployeeService
    ) { }

    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadEmployees),
            map(() => {
                try {
                    const employees = this.employeeService.getEmployees(); 
                    return loadEmployeesSuccess({ employees }); 
                } catch (error) {
                    return loadEmployeesFailure({ error }); 
                }
            }),
            catchError((error) => of(loadEmployeesFailure({ error }))) 
        )
    );
    
    addEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addReportee),
            map(action => {
                try {
                    this.employeeService.addEmployee(action.reportee);
                    const updatedEmployees = this.employeeService.getEmployees(); 
                    return addReporteeSuccess({ updatedEmployees });
                } catch (error) {
                    return addReporteeFailure({ error });
                }
            }),
            catchError(error => of(addReporteeFailure({ error })))  
        )
    );

    deleteEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteEmployee),
            map(action => {
                try {
                    const employees=this.employeeService.getEmployees()
                    const managerId=employees.find(emp=>emp.id===action.employeeId)?.managerId
                    if(!managerId){
                        return deleteEmployeeFailure({ error:`CEO is at top of hierarchy, can't be deleted` });
                    }
                    this.employeeService.deleteEmployee(action.employeeId);
                    const updatedEmployees = this.employeeService.getEmployees(); 
                    return deleteEmployeeSuccess({ updatedEmployees });
                } catch (error) {
                    return deleteEmployeeFailure({ error });
                }
            }),
            catchError(error => of(deleteEmployeeFailure({ error })))  
        )
    );
    
    changeReportingLine$ = createEffect(() =>
        this.actions$.pipe(
            ofType(changeReportingLine),
            map(action => {
                try {
                    const isSuccess = this.employeeService.changeReportingLine(action.employeeId, action.newManagerId);
                    const updatedEmployees = this.employeeService.getEmployees(); 
                    if (isSuccess) {
                        return changeReportingLineSuccess({ updatedEmployees });
                    } else {
                        return changeReportingLineFailure({ error: 'This would lead to a cyclical hierarchy, kindly check once' });
                    }
                } catch (error) {
                    return changeReportingLineFailure({ error });
                }
            }),
            catchError(error => of(changeReportingLineFailure({ error })))
        )
    );
}
