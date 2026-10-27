import type { Env } from './env';
import { route } from './router';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      return await route(request, env);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro interno';
      return new Response(
        JSON.stringify({ error: { code: 'INTERNAL_ERROR', message } }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      );
    }
  },
} satisfies ExportedHandler<Env>;
