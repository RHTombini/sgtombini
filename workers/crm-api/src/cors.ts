import type { Env } from './env';
import { parseAllowedOrigins } from './env';

export function corsHeaders(request: Request, env: Env): Headers {
  const origin = request.headers.get('Origin') ?? '';
  const allowed = parseAllowedOrigins(env);
  const headers = new Headers();
  if (allowed.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }
  headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  headers.set('Access-Control-Max-Age', '86400');
  return headers;
}

export function withCors(response: Response, request: Request, env: Env): Response {
  const headers = new Headers(response.headers);
  corsHeaders(request, env).forEach((value, key) => headers.set(key, value));
  return new Response(response.body, { status: response.status, headers });
}
