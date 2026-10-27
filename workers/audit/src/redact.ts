const SENSITIVE_KEYS = new Set([
  'password',
  'password_hash',
  'token',
  'access_token',
  'refresh_token',
  'authorization',
  'birth_date',
  'birthDate',
  'cpf',
  'rg',
  'bank_account',
  'mobile_phone',
  'mobilePhone',
]);

const REDACTED = '[REDACTED]';

export function redact(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map(redact);
  if (typeof value !== 'object') return value;

  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    result[key] = SENSITIVE_KEYS.has(key) ? REDACTED : redact(val);
  }
  return result;
}
