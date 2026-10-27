import type { UUID, ISODate, ISODateTime } from './common';

export type EmployeeStatus =
  | 'active'
  | 'inactive'
  | 'terminated'
  | 'pending_data';

export interface Employee {
  id: UUID;
  fullName: string;
  role: string;
  departmentId: UUID;
  unitId: UUID;
  birthDate: ISODate;
  registrationDate: ISODateTime;
  startDate: ISODate;
  corporateEmail: string | null;
  mobilePhone: string | null;
  status: EmployeeStatus;
  createdBy: UUID;
  updatedBy: UUID;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface EmployeePublic {
  id: UUID;
  fullName: string;
  role: string;
  unitId: UUID;
  status: EmployeeStatus;
}

export interface EmployeeCreateInput {
  fullName: string;
  role: string;
  departmentId: UUID;
  unitId: UUID;
  birthDate: ISODate;
  startDate: ISODate;
  corporateEmail?: string | null;
  mobilePhone?: string | null;
}

export interface EmployeeUpdateInput extends Partial<EmployeeCreateInput> {
  status?: EmployeeStatus;
}

export type VacationStatus =
  | 'regular'
  | 'a_vencer'
  | 'proximo_limite'
  | 'vencido_verificar'
  | 'pendente_dados'
  | 'programadas'
  | 'concluido';

export interface VacationPeriod {
  id: UUID;
  employeeId: UUID;
  accrualStart: ISODate;
  accrualEnd: ISODate;
  concessiveEnd: ISODate;
  status: VacationStatus;
}

export interface VacationGrant {
  id: UUID;
  periodId: UUID;
  start: ISODate;
  end: ISODate;
  days: number;
  grantedBy: UUID;
  grantedAt: ISODateTime;
}

export interface ImportPreviewField {
  field: keyof EmployeeCreateInput;
  extractedValue: string | null;
  confidence: 'high' | 'low' | 'missing';
  requiresReview: boolean;
}

export interface ImportPreviewRow {
  sourceRowNumber: number;
  fields: ImportPreviewField[];
  duplicateOfEmployeeId: UUID | null;
}
