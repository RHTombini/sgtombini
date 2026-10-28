import type { Env } from './env';
import { withCors } from './cors';
import { handleHealth } from './handlers/health';
import {
  handleListSuppliers,
  handleGetSupplier,
  handleCreateSupplier,
  handleUpdateSupplier,
} from './handlers/suppliers';
import { handleListPeople } from './handlers/people';

export async function route(request: Request, env: Env): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return withCors(new Response(null, { status: 204 }), request, env);
  }

  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;
  let response: Response;

  if (method === 'GET' && path === '/health') {
    response = await handleHealth();
  } else if (method === 'GET' && path === '/v1/crm/suppliers') {
    response = await handleListSuppliers(request, env);
  } else if (method === 'POST' && path === '/v1/crm/suppliers') {
    response = await handleCreateSupplier(request, env);
  } else if (method === 'GET' && path.startsWith('/v1/crm/suppliers/')) {
    response = await handleGetSupplier(request, env, path.slice('/v1/crm/suppliers/'.length));
  } else if (method === 'PUT' && path.startsWith('/v1/crm/suppliers/')) {
    response = await handleUpdateSupplier(request, env, path.slice('/v1/crm/suppliers/'.length));
  } else if (method === 'GET' && path === '/v1/crm/people') {
    response = await handleListPeople(request, env);
  } else {
    response = new Response(
      JSON.stringify({ error: { code: 'NOT_FOUND', message: 'Rota não encontrada' } }),
      { status: 404, headers: { 'content-type': 'application/json' } }
    );
  }

  return withCors(response, request, env
