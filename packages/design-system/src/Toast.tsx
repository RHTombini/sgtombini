import React, { useEffect, type ReactNode } from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastProps {
  open: boolean;
  variant?: ToastVariant;
  onClose: () => void;
  children: ReactNode;
  duration?: number;
}

export function Toast({
  open,
  variant = 'info',
  onClose,
  children,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className={`ds-toast ds-toast--${variant}`} role="status" aria-live="polite">
      {children}
    </div>
  );
}
