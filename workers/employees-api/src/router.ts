import type { Env } from './env';
import { withCors } from './cors';
import { handleHealth } from './handlers/health';
import { handleList } from './handlers/list';
import { handleGet } from './handlers/get';
import { handleCreate } from './handlers/create';
import { handleUpdate } from './handlers/update';

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
  } else if (method === 'GET' && path === '/v1/employees') {
    response = await handleList(request, env);
  } else if (method === 'POST' && path === '/v1/employees') {
    response = await handleCreate(request, env);
  } else if (method === 'GET' && path.startsWith('/v1/employees/')) {
    const id = path.slice('/v1/employees/'.length);
    response = await handleGet(request, env, id);
  } else if (method === 'PUT' && path.startsWith('/v1/employees/')) {
    const id = path.slice('/v1/employees/'.length);
    response = await handleUpdate(request, env, id);
  } else {
    response = new Response(
      JSON.stringify({ error: { code: 'NOT_FOUND', message: 'Rota não encontrada' } }),
      { status: 404, headers: { 'content-type': 'application/json' } }
    );
  }

  return withCors(response, request, env);
}
