import type { Env } from './env';

export function corsHeaders(_request: Request, _env: Env): Headers {
  const headers = new Headers();
  
  // Força a liberação para o seu frontend específico e para localhost
  headers.set('Access-Control-Allow-Origin', 'https://sgt-shell.pages.dev');
  headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization,apikey');
  headers.set('Access-Control-Max-Age', '86400');
  
  return headers;
}

export function withCors(response: Response, request: Request, env: Env): Response {
  const headers = new Headers(response.headers);
  corsHeaders(request, env).forEach((value, key) => headers.set(key, value));
  return new Response(response.body, { status: response.status, headers });
}
