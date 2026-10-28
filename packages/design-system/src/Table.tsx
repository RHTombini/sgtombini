import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  loading?: boolean;
  emptyMessage?: string;
}

export function Table<T>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyMessage = 'Nenhum registro encontrado.',
}: TableProps<T>) {
  return (
    <table className="ds-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              style={col.align ? { textAlign: col.align } : undefined}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan={columns.length}>Carregando…</td>
          </tr>
        )}
        {!loading && data.length === 0 && (
          <tr>
            <td colSpan={columns.length}>{emptyMessage}</td>
          </tr>
        )}
        {!loading &&
          data.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={col.align ? { textAlign: col.align } : undefined}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
