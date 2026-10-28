export interface Supplier {
  id: string;
  name: string;
  document: string | null;
  category: string | null;
  email: string | null;
  phone: string | null;
  status: 'active' | 'inactive' | 'blocked';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Person {
  id: string;
  fullName: string;
  role: string;
  unitId: string;
  departmentId: string;
  status: string;
  state: string | null;
}

export type CrmTab = 'people' | 'suppliers';
