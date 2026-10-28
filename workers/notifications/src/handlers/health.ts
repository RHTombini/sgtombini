export async function handleHealth(): Promise<Response> {
  return new Response(
    JSON.stringify({ status: 'ok', service: 'sgt-notifications' }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}
