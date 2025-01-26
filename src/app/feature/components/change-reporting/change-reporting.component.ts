import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeUI } from 'src/app/core/models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-reporting',
  templateUrl: './change-reporting.component.html',
  styleUrls: ['./change-reporting.component.scss']
})
export class ChangeReportingComponent {
  @Input('employee') employee: EmployeeUI = {} as EmployeeUI;
  @Input('showDialog') showDialog = false
  @Input('managers') managers:{id:string,name:string}[] = []
  @Output() modalClose = new EventEmitter<boolean>();

  changeReportingForm: FormGroup = {} as FormGroup;

  constructor(private employeeService: EmployeeService,private fb: FormBuilder) {
  }

  ngOnInit(){
    this.changeReportingForm = this.fb.group({
      manager: ['', Validators.required]
    });
  }

  get managerControl() {
    return this.changeReportingForm.get('manager');
  }

  closeModal() {
    this.modalClose.emit(false)
    this.resetForm();
  }

  submit(){
    let isReportingUpdateSuccesful=this.employeeService.changeReportingLine(this.employee?.id,this.managerControl?.value)
    if(isReportingUpdateSuccesful){
      this.resetForm();
      this.modalClose.emit(true)
    }
  }

  resetForm() {
    this.changeReportingForm.reset();
    this.managerControl?.setValue('');
    this.changeReportingForm.markAsUntouched();
    this.changeReportingForm.markAsPristine();
  }

}


// TODO - what if there are 2 emoloyees A and B, B manager is A and after change reporting A manager we set to B, now A's manager is B and B's manager is A
// which leads to a cyclic manager relationship
