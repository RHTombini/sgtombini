export async function handleHealth(): Promise<Response> {
  return new Response(
    JSON.stringify({ status: 'ok', service: 'sgt-audit' }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}
