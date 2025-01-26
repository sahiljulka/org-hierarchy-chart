import { Component, Input } from '@angular/core';
import { EmployeeUI } from 'src/app/core/models/employee.model';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent {
  @Input('employee') employee: EmployeeUI | null = null;

  showDialog = false;

  constructor() {
  }



}
