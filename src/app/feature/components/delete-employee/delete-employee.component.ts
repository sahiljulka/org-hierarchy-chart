import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeUI } from 'src/app/core/models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent {
  @Input('employee') employee: EmployeeUI = {} as EmployeeUI;
  @Input('showDialog') showDialog = false
  @Output() modalClose = new EventEmitter<boolean>();


  constructor(private employeeService: EmployeeService) {
  }

  closeModal() {
    this.modalClose.emit(false)
  }

  deleteEmployee(){
    this.employeeService.deleteEmployee(this.employee?.id)
    this.modalClose.emit(true)
  }


}


// TODO - Need to reassign the manager when the employee is deleted