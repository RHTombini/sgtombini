import { useEffect, useRef, useState } from 'react';
import { QR_TYPE_LABELS, type QrContentType, type QrForm } from './qrcode-types';
import { buildQrPayload } from './qrcode-utils';
import { renderQrToCanvas, downloadCanvasAsPng } from './qrcode-render';
import './qrcode.css';

const initialForm: QrForm = {
  type: 'url',
  value: '',
  label: '',
  color: '#65A70A',
  logoEnabled: true,
};

export function QrCodePage() {
  const [form, setForm] = useState<QrForm>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!form.value.trim()) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    const payload = buildQrPayload(form.type, form.value);
    renderQrToCanvas(canvas, {
      payload,
      color: form.color,
      logoUrl: form.logoEnabled ? '/assets/brand/logo.svg' : null,
    }).catch((e) => setError(e instanceof Error ? e.message : 'Falha ao gerar QR'));
  }, [form]);

  const set = <K extends keyof QrForm>(key: K) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const raw = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((f) => ({ ...f, [key]: raw }));
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const base = (form.label || 'qrcode').replace(/\s+/g, '-').toLowerCase();
    downloadCanvasAsPng(canvas, base);
  };

  const disabled = !form.value.trim();

  return (
    <div className="qr-page">
      <h1>Gerador de QR Code</h1>
      <p className="qr-page__hint">
        Gere QR Codes para páginas, e-mails, WhatsApp, telefones, contatos (vCard) ou texto livre.
        A logo oficial é posicionada no centro, com correção de erro alta.
      </p>

      <div className="qr-grid">
        <div className="ds-card qr-form">
          <label className="ds-label">Tipo de conteúdo</label>
          <select className="ds-input" value={form.type} onChange={set('type')}>
            {(Object.keys(QR_TYPE_LABELS) as QrContentType[]).map((t) => (
              <option key={t} value={t}>
                {QR_TYPE_LABELS[t]}
              </option>
            ))}
          </select>

          <label className="ds-label">Conteúdo</label>
          <input
            className="ds-input"
            value={form.value}
            onChange={set('value')}
            placeholder={
              form.type === 'url'
                ? 'https://exemplo.com'
                : form.type === 'email'
                ? 'contato@empresa.com'
                : form.type === 'whatsapp'
                ? '5511999999999'
                : form.type === 'phone'
                ? '+55 11 99999-9999'
                : form.type === 'vcard'
                ? 'BEGIN:VCARD...'
                : 'Texto livre'
            }
          />

          <label className="ds-label">Rótulo (opcional)</label>
          <input
            className="ds-input"
            value={form.label}
            onChange={set('label')}
            placeholder="Nome do arquivo ao baixar"
          />

          <label className="ds-label">Cor do QR</label>
          <input
            type="color"
            className="ds-input"
            value={form.color}
            onChange={set('color')}
          />

          <label className="ds-label qr-checkbox">
            <input
              type="checkbox"
              checked={form.logoEnabled}
              onChange={set('logoEnabled')}
            />
            Incluir logo da empresa no centro
          </label>
        </div>

        <div className="ds-card qr-preview">
          <h2>Pré-visualização</h2>
          <canvas ref={canvasRef} className="qr-canvas" />
          {error && <div className="ds-field-error">{error}</div>}
          <button
            className="ds-button ds-button--primary"
            onClick={download}
            disabled={disabled}
          >
            Baixar PNG
          </button>
        </div>
      </div>
    </div>
  );
}
