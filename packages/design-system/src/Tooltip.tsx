import React, { type ReactNode } from 'react';

export interface TooltipProps {
  label: string;
  children: ReactNode;
}

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <span className="ds-tooltip">
      {children}
      <span className="ds-tooltip__bubble" role="tooltip">
        {label}
      </span>
    </span>
  );
}
