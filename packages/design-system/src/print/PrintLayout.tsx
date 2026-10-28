import type { ReactNode } from 'react';

export interface PrintLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onPrint?: () => void;
}

export function PrintLayout({ title, subtitle, children, onPrint }: PrintLayoutProps) {
  return (
    <div className="shell-print">
      <div className="ds-no-print shell-print__toolbar">
        <button
          className="ds-button ds-button--primary"
          onClick={onPrint ?? (() => window.print())}
        >
          Imprimir
        </button>
      </div>

      <div className="ds-print-header">
        <img src="/assets/brand/logo.svg" alt="Grupo Tombini" height={32} />
        <div>
          <strong>{title}</strong>
          {subtitle && <div>{subtitle}</div>}
        </div>
      </div>

      <div className="shell-print__content">{children}</div>

      <div className="ds-print-footer">
        <span>Grupo Tombini — Sistema de Gestão Tombini</span>
        <span>Emitido em {new Date().toLocaleString('pt-BR')}</span>
      </div>
    </div>
  );
}
