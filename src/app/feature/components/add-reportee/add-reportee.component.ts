import { Employee, EmployeeDesignation, EmployeeUI } from 'src/app/core/models/employee.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { EmployeeService } from '../../services/employee.service';
import { Store } from '@ngrx/store';
import { addReportee } from '../../store/actions/employee.actions';

@Component({
  selector: 'app-add-reportee',
  templateUrl: './add-reportee.component.html',
  styleUrls: ['./add-reportee.component.scss']
})
export class AddReporteeComponent {
  @Input('managerDetails') managerDetails: EmployeeUI = {} as EmployeeUI
  @Output() modalClose = new EventEmitter<boolean>();

  showDialog = true

  addEmployeeForm!: FormGroup;
  designationOptions = Object.values(EmployeeDesignation);

  constructor(private fb: FormBuilder,private store: Store) { }

  ngOnInit() {
    this.addEmployeeForm = this.fb.group({
      name: ['', [Validators.required]],
      designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  get nameControl() {
    return this.addEmployeeForm.get('name')!;
  }

  get designationControl() {
    return this.addEmployeeForm.get('designation')!;
  }

  get emailControl() {
    return this.addEmployeeForm.get('email')!;
  }

  get phoneControl() {
    return this.addEmployeeForm.get('phone')!;
  }

  onSubmit() {
    let employeeDetails: Employee = { ...this.addEmployeeForm.value, managerId: this.managerDetails?.id, id: uuidv4() }
    this.store.dispatch(addReportee({reportee:employeeDetails}))
    this.addEmployeeForm.reset()
    this.modalClose.emit(true)
  }

    
  closeModal() {
    this.addEmployeeForm.reset()
    this.modalClose.emit(false)
  }

}
