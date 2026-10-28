const INTRANET_URL = import.meta.env.VITE_INTRANET_URL as string;

export async function fetchIntranetContent<T>(fileName: string): Promise<T> {
  const res = await fetch(`${INTRANET_URL}/content/${fileName}`, {
    headers: { accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Falha ao carregar ${fileName}`);
  return (await res.json()) as T;
}
