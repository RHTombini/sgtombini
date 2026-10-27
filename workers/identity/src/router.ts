import type { Env } from './env';
import { withCors } from './cors';
import { handleLogin, handleRefresh, handleLogout } from './handlers/auth';
import { handleMe } from './handlers/me';
import { handleHealth } from './handlers/health';

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
  } else if (method === 'POST' && path === '/v1/auth/login') {
    response = await handleLogin(request, env);
  } else if (method === 'POST' && path === '/v1/auth/refresh') {
    response = await handleRefresh(request, env);
  } else if (method === 'POST' && path === '/v1/auth/logout') {
    response = await handleLogout(request, env);
  } else if (method === 'GET' && path === '/v1/auth/me') {
    response = await handleMe(request, env);
  } else {
    response = new Response(
      JSON.stringify({ error: { code: 'NOT_FOUND', message: 'Rota não encontrada' } }),
      { status: 404, headers: { 'content-type': 'application/json' } }
    );
  }

  return withCors(response, request, env);
}
