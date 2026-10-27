export async function handleHealth(): Promise<Response> {
  return new Response(
    JSON.stringify({ status: 'ok', service: 'sgt-employees-api' }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}
