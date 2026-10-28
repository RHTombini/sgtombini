import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { DocumentRequest, DocumentApprover, DocumentVersion } from '@sgt/shared-types';
import { documentsApi } from '../services/api';
import { getSignedDownloadUrl } from '../services/storage';
import { FileViewer, PrintLayout } from '@sgt/design-system';

export function DocumentViewPage() {
  const { id } = useParams();
  const [doc, setDoc] = useState<DocumentRequest | null>(null);
  const [approvers, setApprovers] = useState<DocumentApprover[]>([]);
  const [versions, setVersions] = useState<DocumentVersion[]>([]);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    documentsApi
      .get(id)
      .then((r) => {
        setDoc(r.document);
        setApprovers(r.approvers);
        setVersions(r.versions);
        const latest = r.versions[0];
        if (latest) {
          getSignedDownloadUrl(latest.storagePath)
            .then(setSignedUrl)
            .catch(() => undefined);
        }
      })
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="ds-field-error">{error}</div>;
  if (!doc) return <p>Carregando…</p>;

  return (
    <div className="doc-page">
      <div className="doc-page__header">
        <h1>{doc.title}</h1>
        <Link to={`/documentos/${doc.id}/aprovar`} className="ds-button ds-button--secondary">
          Aprovar / decidir
        </Link>
      </div>

      <PrintLayout title="Comprovante de documento" subtitle={doc.title}>
        <table className="ds-table">
          <tbody>
            <tr><th>Tipo</th><td>{doc.documentType}</td></tr>
            <tr><th>Estado</th><td>{doc.state}</td></tr>
            <tr><th>Descrição</th><td>{doc.description}</td></tr>
            <tr><th>Criado em</th><td>{new Date(doc.createdAt).toLocaleString('pt-BR')}</td></tr>
            <tr><th>Submetido em</th><td>{doc.submittedAt ? new Date(doc.submittedAt).toLocaleString('pt-BR') : '—'}</td></tr>
          </tbody>
        </table>

        <h3>Aprovadores</h3>
        <table className="ds-table">
          <thead>
            <tr><th>Ordem</th><th>Aprovador</th><th>Decisão</th><th>Comentário</th></tr>
          </thead>
          <tbody>
            {approvers.map((a) => (
              <tr key={a.id}>
                <td>{a.orderIndex}</td>
                <td>{a.designatedApproverId}</td>
                <td>{a.decision}</td>
                <td>{a.comment ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Versões</h3>
        <ul>
          {versions.map((v) => (
            <li key={v.id}>
              v{v.versionNumber} — {new Date(v.uploadedAt).toLocaleString('pt-BR')}
              {v.isApproved && ' (aprovada)'}
            </li>
          ))}
        </ul>
      </PrintLayout>

      {signedUrl && (
        <div className="doc-attachment">
          <h3>Anexo</h3>
          <FileViewer signedUrl={signedUrl} mime="application/pdf" />
        </div>
      )}
    </div>
  );
}
