export interface Employee {
    name: string;
    id: string;
    designation: EmployeeDesignation;
    email: string;
    phone: string;
    managerId: string | null;
  }
  

export enum EmployeeDesignation {
    CEO='CEO',
    Manager = 'Manager',
    SMTS = 'SMTS',
    Staff1 = 'Staff1',
    Staff2 = 'Staff2',
    MTS1 = 'MTS1',
    MTS2 = 'MTS2',
    MTS3 = 'MTS3'
  }


  export interface EmployeeUI extends Employee {
    managerName: string
  }