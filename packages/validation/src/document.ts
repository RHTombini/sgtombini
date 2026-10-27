import { z } from 'zod';

export const documentCreateSchema = z.object({
  title: z.string().trim().min(3, 'Título deve ter ao menos 3 caracteres'),
  documentType: z.string().trim().min(2, 'Tipo de documento obrigatório'),
  description: z.string().trim().min(10, 'Descrição deve ter ao menos 10 caracteres'),
  unitId: z.string().uuid('Unidade inválida'),
  departmentId: z.string().uuid('Setor inválido'),
  confidentialityLevel: z
    .enum(['internal', 'restricted', 'confidential'])
    .nullable()
    .optional(),
  deadline: z.string().datetime().nullable().optional(),
});

export const approverAssignmentSchema = z.object({
  approverId: z.string().uuid('Aprovador inválido'),
  orderIndex: z.number().int().nonnegative(),
  groupId: z.string().nullable().optional(),
  mode: z.enum(['sequential', 'parallel']),
});

export const documentDecisionSchema = z.object({
  decision: z.enum(['approved', 'rejected', 'changes_requested']),
  comment: z.string().max(2000).optional(),
});

export type DocumentCreateSchema = z.infer<typeof documentCreateSchema>;
export type ApproverAssignmentSchema = z.infer<typeof approverAssignmentSchema>;
export type DocumentDecisionSchema = z.infer<typeof documentDecisionSchema>;
