import { Route } from 'react-router-dom';
import { CrmPage } from './CrmPage';

export function CrmRoutes() {
  return (
    <>
      <Route path="crm" element={<CrmPage />} />
    </>
  );
}
