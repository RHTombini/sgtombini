import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  tooltip?: string;
  loading?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = 'primary',
  icon,
  tooltip,
  loading = false,
  disabled,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    'ds-button',
    `ds-button--${variant}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading ? <span aria-hidden="true">…</span> : icon}
      {children}
    </>
  );

  const button = (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={tooltip && !children ? tooltip : undefined}
      {...rest}
    >
      {content}
    </button>
  );

  if (!tooltip) return button;

  return (
    <span className="ds-tooltip">
      {button}
      <span className="ds-tooltip__bubble" role="tooltip">
        {tooltip}
      </span>
    </span>
  );
}
