import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { EmployeeUI } from 'src/app/core/models/employee.model';
import { EMPLOYEE_ACTIONS } from '../org-chart-base/org-chart-base.component';

interface OrganizationNode {
  label: string;
  id: string;
  email: string;
  phone: string;
  designation: string;
  children?: OrganizationNode[];
  expanded: boolean,
}

@Component({
  selector: 'app-org-chart-graph',
  templateUrl: './org-chart-graph.component.html',
  styleUrls: ['./org-chart-graph.component.scss']
})
export class OrgChartGraphComponent {
  @Input() employees: EmployeeUI[] = [];
  @Output() addReportee = new EventEmitter<EmployeeUI>();
  @Output() editEmployee = new EventEmitter<EmployeeUI>();
  @Output() deleteEmployee = new EventEmitter<EmployeeUI>();
  @Output() changeReportingLine = new EventEmitter<EmployeeUI>();

  actions: string[] = []
  selectedNode: TreeNode = {} as TreeNode;
  organizationData: OrganizationNode[] = [];

  ngOnInit() {
    this.organizationData = this.buildOrganizationTree(this.employees);
    this.actions = Object.values(EMPLOYEE_ACTIONS)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employees']) {
      const previousValue = changes['employees'].previousValue;
      const currentValue = changes['employees'].currentValue;

      if (previousValue !== currentValue) {
        this.organizationData = this.buildOrganizationTree(this.employees);
      }
    }
  }


  buildOrganizationTree(employees: EmployeeUI[]): OrganizationNode[] {
    const employeeMap = new Map<string, OrganizationNode>();

    employees.forEach(employee => {
      employeeMap.set(employee.id, {
        label: employee.name,
        id: employee.id,
        email: employee.email,
        phone: employee.phone,
        designation: employee.designation,
        children: [],
        expanded: true
      });
    });

    const rootNodes: OrganizationNode[] = [];

    employees.forEach(employee => {
      if (employee.managerId) {
        const managerNode = employeeMap.get(employee.managerId);
        if (managerNode) {
          managerNode?.children?.push(employeeMap.get(employee.id)!);
        }
      } else {
        rootNodes.push(employeeMap.get(employee.id)!);
      }
    });

    return rootNodes;
  }

  onCardSelected(actionSelected: string, node: OrganizationNode) {
    let employee = this.employees.find(emp => emp.id == node.id)
    switch (actionSelected) {
      case EMPLOYEE_ACTIONS.Add_Reportee:
        this.onAddReportee(employee!);
        break;
      case EMPLOYEE_ACTIONS.Change_Reporting_Line:
        this.onChangeReportingLine(employee!);
        break;
      case EMPLOYEE_ACTIONS.Delete_Employee:
        this.onDeleteEmployee(employee!);
        break;
    }
  }

  onAddReportee(manager: EmployeeUI): void {
    this.addReportee.emit(manager);
  }

  onDeleteEmployee(employee: EmployeeUI): void {
    this.deleteEmployee.emit(employee);
  }

  onChangeReportingLine(employee: EmployeeUI): void {
    this.changeReportingLine.emit(employee);
  }
}
