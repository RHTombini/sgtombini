import type { Env } from '../env';
import { createSupabaseClient } from '../supabase';

export async function handleMe(request: Request, env: Env): Promise<Response> {
  const auth = request.headers.get('Authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

  if (!token) {
    return json({ error: { code: 'UNAUTHORIZED', message: 'Token ausente' } }, 401);
  }

  const supabase = createSupabaseClient(env);
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return json({ error: { code: 'UNAUTHORIZED', message: 'Token inválido' } }, 401);
  }

  const role = (data.user.app_metadata?.role as string | undefined) ?? 'consulta';
  const name = (data.user.user_metadata?.name as string | undefined) ?? data.user.email ?? '';

  return json({
    data: {
      id: data.user.id,
      email: data.user.email,
      name,
      role,
    },
  });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
