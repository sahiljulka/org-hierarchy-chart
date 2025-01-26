import { EmployeeService } from '../../services/employee.service';
import { Employee, EmployeeUI } from './../../../core/models/employee.model';
import { Component } from '@angular/core';


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

  MODALTYPE = ModalType

  employees: EmployeeUI[] = [];
  showAddReporteeDialog = false
  managerDetails: { managerName: string, managerId: string } = { managerName: '', managerId: "" }
  isModalOpen = false;
  modalType: ModalType = ModalType.AddReportee;
  selectedEmployee: EmployeeUI ={} as EmployeeUI;
  managers:{id:string,name:string}[]=[]

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }

  openModal(modalType: ModalType, employee: EmployeeUI) {
    this.modalType = modalType;
    if (employee) {
      this.selectedEmployee = employee;
    }
    if(this.modalType===ModalType.ChangeReporting){
      this.managers=this.employees.filter(e=>(e.id!==employee.id && e.id!=employee.managerId)).map(e=>({id:e.id,name:e.name}))
    }
    this.isModalOpen = true;
  }

  modalClose(actionCompleted=false) {
    this.isModalOpen = false;
    if(actionCompleted){
      this.fetchEmployees()
    }
  }
}
