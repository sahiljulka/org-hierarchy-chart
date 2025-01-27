import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeUI } from 'src/app/core/models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Store } from '@ngrx/store';
import { deleteEmployee } from '../../store/actions/employee.actions';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent {
  @Input('employee') employee: EmployeeUI = {} as EmployeeUI;
  @Output() modalClose = new EventEmitter<boolean>();

  showDialog = true

  constructor(private store: Store) {
  }

  closeModal() {
    this.modalClose.emit(false)
  }

  deleteEmployee(){
    this.store.dispatch(deleteEmployee({employeeId:this.employee.id}))
    this.modalClose.emit(true)
  }
}