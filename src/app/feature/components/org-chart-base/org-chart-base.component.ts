import { select, Store } from '@ngrx/store';
import { EmployeeService } from '../../services/employee.service';
import { Employee, EmployeeUI } from './../../../core/models/employee.model';
import { Component } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { selectEmployees, selectError, selectLoading } from '../../store/selectors/employee.selectors';
import { loadEmployees } from '../../store/actions/employee.actions';


export enum ModalType {
  AddReportee = 'AddReportee',
  DeleteReportee = 'DeleteReportee',
  ChangeReporting = 'ChangeReporting',
}

@Component({
  selector: 'app-org-chart-base',
  templateUrl: './org-chart-base.component.html',
  styleUrls: ['./org-chart-base.component.scss']
})
export class OrgChartBaseComponent {

  employees$: Observable<EmployeeUI[]> = this.store.pipe(select(selectEmployees));  // Observable of employee list
  loading$: Observable<boolean> = this.store.pipe(select(selectLoading));  // Observable of loading status
  error$: Observable<any> = this.store.pipe(select(selectError));  // Observable of error (if any)
  managers$: Observable<{ id: string, name: string }[]> = of([])
  MODALTYPE = ModalType
  isModalOpen = false;
  modalType: ModalType = ModalType.AddReportee;
  selectedEmployee: EmployeeUI = {} as EmployeeUI;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.fetchEmployees();
    this.managers$ = this.employees$.pipe(map(((employees: EmployeeUI[]) =>
      (employees.map(e => ({ id: e.id, name: e.name }))))))
  }

  get showAddReporteeDialog() {
    return this.isModalOpen && this.modalType === this.MODALTYPE.AddReportee
  }

  get showDeleteEmployeeDialog() {
    return this.isModalOpen && this.modalType === this.MODALTYPE.DeleteReportee
  }

  get showChangeReportingDialog() {
    return this.isModalOpen && this.modalType === this.MODALTYPE.ChangeReporting
  }

  fetchEmployees(): void {
    this.store.dispatch(loadEmployees())
  }

  openModal(modalType: ModalType, employee: EmployeeUI) {
    this.modalType = modalType;
    if (employee) {
      this.selectedEmployee = employee;
    }
    this.isModalOpen = true;
  }

  modalClose(actionCompleted = false) {
    this.isModalOpen = false;
    if (actionCompleted) {
      this.fetchEmployees()
    }
  }
}
