export type UUID = string;

export type ISODate = string;      // "YYYY-MM-DD"
export type ISODateTime = string;  // ISO 8601 completo

export type UserRole = 'admin' | 'rh' | 'gestor' | 'auditor' | 'consulta';

export interface AuthenticatedUser {
  id: UUID;
  name: string;
  email: string;
  role: UserRole;
  unit: string | null;
  active: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}
