import { useState } from 'react';

export interface ContentEditorProps<T> {
  title: string;
  fileName: string;
  initial: T;
  validate?: (value: T) => string | null;
  children: (value: T, setValue: (v: T) => void) => React.ReactNode;
}

export function ContentEditor<T>({
  title,
  fileName,
  initial,
  validate,
  children,
}: ContentEditorProps<T>) {
  const [value, setValue] = useState<T>(initial);
  const [error, setError] = useState<string | null>(null);

  const download = () => {
    const validationError = validate?.(value) ?? null;
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    const blob = new Blob([JSON.stringify(value, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="shell-content-editor">
      <h1>{title}</h1>
      <p className="shell-content-editor__hint">
        Edite o conteúdo e clique em "Baixar JSON". Depois, envie o arquivo ao repositório
        no caminho indicado. A gravação direta no GitHub virá em fase futura.
      </p>

      {children(value, setValue)}

      {error && <div className="ds-field-error">{error}</div>}

      <div className="shell-content-editor__actions">
        <button className="ds-button ds-button--primary" onClick={download}>
          Baixar JSON
        </button>
      </div>
    </div>
  );
}
