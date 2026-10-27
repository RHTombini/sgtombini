import type { Env } from './env';
import { withCors } from './cors';
import { handleHealth } from './handlers/health';
import { handleEvents } from './handlers/events';
import { handleQuery } from './handlers/query';

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
  } else if (method === 'POST' && path === '/v1/audit/events') {
    response = await handleEvents(request, env);
  } else if (method === 'GET' && path === '/v1/audit/events') {
    response = await handleQuery(request, env);
  } else {
    response = new Response(
      JSON.stringify({ error: { code: 'NOT_FOUND', message: 'Rota não encontrada' } }),
      { status: 404, headers: { 'content-type': 'application/json' } }
    );
  }

  return withCors(response, request, env);
}
