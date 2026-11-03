import type { Env } from './env';
import { parseAllowedOrigins } from './env';

export function corsHeaders(request: Request, env: Env): Headers {
  const origin = request.headers.get('Origin') ?? '';
  const allowed = parseAllowedOrigins(env);
  
  // Log para debug (aparece nos logs do Worker)
  console.log(`CORS Request - Origin: ${origin}, Allowed: ${allowed.join(', ')}`);

  const headers = new Headers();

  // Se a origem estiver na lista OU se a lista contiver '*', permite
  if (allowed.includes(origin) || allowed.includes('*')) {
    headers.set('Access-Control-Allow-Origin', origin);
  } else {
    // Fallback: se não bater, mas for uma origem do Cloudflare Pages, permite (para não bloquear o login)
    if (origin.endsWith('.pages.dev')) {
      headers.set('Access-Control-Allow-Origin', origin);
    }
  }

  headers.set('Vary', 'Origin');
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
