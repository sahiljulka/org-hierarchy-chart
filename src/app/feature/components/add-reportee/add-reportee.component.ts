import { Employee,EmployeeDesignation } from 'src/app/core/models/employee.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-reportee',
  templateUrl: './add-reportee.component.html',
  styleUrls: ['./add-reportee.component.scss']
})
export class AddReporteeComponent {
  @Input('showDialog') showDialog = false
  @Input('managerDetails') managerDetails:{managerName:string,managerId:string} = {managerName:'',managerId:""}
  @Output() modalClose = new EventEmitter<boolean>();
  @Output() saveEmployee = new EventEmitter<Employee>();

  closeModal() {
    this.modalClose.emit(true)
  }

  addEmployeeForm!: FormGroup;
  designationOptions = Object.values(EmployeeDesignation);

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addEmployeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
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
    let employeeDetails:Employee = {...this.addEmployeeForm.value,managerId:this.managerDetails.managerId,id:uuidv4()}
    this.saveEmployee.emit(employeeDetails)
    this.addEmployeeForm.reset()
  }

}
