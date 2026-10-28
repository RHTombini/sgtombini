import { z } from 'zod';
import type { Env } from '../env';
import { authenticate, requireRole } from '../auth';
import { createSupabaseClient } from '../supabase';
import {
  listSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
} from '../repositories/suppliers';
import { sendAudit } from '../audit-client';

const createSchema = z.object({
  name: z.string().trim().min(2),
  document: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  status: z.enum(['active', 'inactive', 'blocked']).optional(),
  notes: z.string().nullable().optional(),
});

export async function handleListSuppliers(request: Request, env: Env): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);
  if (!requireRole(ctx, ['admin', 'rh', 'gestor', 'consulta'])) {
    return json({ error: { code: 'FORBIDDEN', message: 'Sem permissão' } }, 403);
  }

  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
  const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get('pageSize') ?? '20')));

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const result = await listSuppliers(supabase, {
    search: url.searchParams.get('search') ?? undefined,
    status: url.searchParams.get('status') ?? undefined,
    category: url.searchParams.get('category') ?? undefined,
    page,
    pageSize,
  });

  return json({ data: result });
}

export async function handleGetSupplier(request: Request, env: Env, id: string): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const supplier = await getSupplier(supabase, id);
  if (!supplier) return json({ error: { code: 'NOT_FOUND', message: 'Fornecedor não encontrado' } }, 404);
  return json({ data: supplier });
}

export async function handleCreateSupplier(request: Request, env: Env): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);
  if (!requireRole(ctx, ['admin', 'rh'])) {
    return json({ error: { code: 'FORBIDDEN', message: 'Sem permissão' } }, 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return json({ error: { code: 'INVALID_INPUT', message: 'Dados inválidos' } }, 400);

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const created = await createSupplier(supabase, parsed.data, ctx.userId);

  await sendAudit(env, {
    actorId: ctx.userId,
    actorRole: ctx.role,
    action: 'crm.supplier_created',
    entityType: 'crm_supplier',
    entityId: created.id,
    module: 'crm',
    after: created as unknown as Record<string, unknown>,
    requestId: crypto.randomUUID(),
  });

  return json({ data: created }, 201);
}

export async function handleUpdateSupplier(request: Request, env: Env, id: string): Promise<Response> {
  const ctx = await authenticate(request, env);
  if (!ctx) return json({ error: { code: 'UNAUTHORIZED', message: 'Não autenticado' } }, 401);
  if (!requireRole(ctx, ['admin', 'rh'])) {
    return json({ error: { code: 'FORBIDDEN', message: 'Sem permissão' } }, 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = createSchema.partial().safeParse(body);
  if (!parsed.success) return json({ error: { code: 'INVALID_INPUT', message: 'Dados inválidos' } }, 400);

  const supabase = createSupabaseClient(env, ctx.accessToken);
  const updated = await updateSupplier(supabase, id, parsed.data, ctx.userId);

  await sendAudit(env, {
    actorId: ctx.userId,
    actorRole: ctx.role,
    action: 'crm.supplier_updated',
    entityType: 'crm_supplier',
    entityId: id,
    module: 'crm',
    after: updated as unknown as Record<string, unknown>,
    requestId: crypto.randomUUID(),
  });

  return json({ data: updated });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
