import { z } from 'zod';

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD');

export const employeeCreateSchema = z.object({
  fullName: z.string().trim().min(3, 'Nome deve ter ao menos 3 caracteres'),
  role: z.string().trim().min(2, 'Cargo obrigatório'),
  departmentId: z.string().uuid('Setor inválido'),
  unitId: z.string().uuid('Unidade inválida'),
  birthDate: isoDate.refine(
    (v) => new Date(v) <= new Date(),
    'Data de nascimento não pode ser futura'
  ),
  startDate: isoDate.refine(
    (v) => new Date(v) >= new Date('1900-01-01') && new Date(v) <= new Date(),
    'Data de início inválida'
  ),
  corporateEmail: z.string().email('E-mail inválido').nullable().optional(),
  mobilePhone: z
    .string()
    .regex(/^\+?[1-9]\d{7,14}$/, 'Telefone inválido')
    .nullable()
    .optional(),
});

export const employeeUpdateSchema = employeeCreateSchema.partial().extend({
  status: z
    .enum(['active', 'inactive', 'terminated', 'pending_data'])
    .optional(),
});

export type EmployeeCreateSchema = z.infer<typeof employeeCreateSchema>;
export type EmployeeUpdateSchema = z.infer<typeof employeeUpdateSchema>;
