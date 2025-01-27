import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeUI } from 'src/app/core/models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { changeReportingLine, changeReportingLineSuccess } from '../../store/actions/employee.actions';
import { selectSuccessAction } from '../../store/selectors/employee.selectors';
import { ActionTypes } from '../../store/actions/actions.type';

@Component({
  selector: 'app-change-reporting',
  templateUrl: './change-reporting.component.html',
  styleUrls: ['./change-reporting.component.scss']
})
export class ChangeReportingComponent {
  @Input('employee') employee: EmployeeUI = {} as EmployeeUI;
  @Input('managers') managers: { id: string, name: string }[] = []
  @Output() modalClose = new EventEmitter<boolean>();

  showDialog = true
  acceptableManagers: { id: string, name: string }[] = []
  changeReportingForm: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit() {
    this.changeReportingForm = this.fb.group({
      manager: ['', Validators.required]
    });
    this.acceptableManagers = this.managers.filter(emp => emp.id != this.employee.id && emp.id != this.employee.managerId)
  }

  get managerControl() {
    return this.changeReportingForm.get('manager');
  }

  closeModal() {
    this.modalClose.emit(false)
    this.resetForm();
  }

  submit() {
    this.store.dispatch(changeReportingLine({ employeeId: this.employee.id, newManagerId: this.managerControl?.value }))
    this.resetForm();
    this.modalClose.emit(true)
  }

  resetForm() {
    this.changeReportingForm.reset();
    this.managerControl?.setValue('');
    this.changeReportingForm.markAsUntouched();
    this.changeReportingForm.markAsPristine();
  }
}