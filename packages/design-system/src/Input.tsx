import { forwardRef, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, className, ...rest },
  ref
) {
  const inputId = id ?? `ds-input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className="ds-field">
      <label className="ds-label" htmlFor={inputId}>
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        className={['ds-input', error ? 'ds-input--error' : '', className ?? '']
          .filter(Boolean)
          .join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
        {...rest}
      />
      {hint && !error && (
        <span id={hintId} className="ds-field-hint">
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className="ds-field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});
