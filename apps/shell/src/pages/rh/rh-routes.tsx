import { Route } from 'react-router-dom';
import { RhDashboardPage } from './RhDashboardPage';
import { MedicalCertificatesPage } from './MedicalCertificatesPage';
import { AbsenteeismPage } from './AbsenteeismPage';
import { RecruitmentPage } from './RecruitmentPage';

export function RhRoutes() {
  return (
    <>
      <Route path="rh" element={<RhDashboardPage />} />
      <Route path="rh/atestados" element={<MedicalCertificatesPage />} />
      <Route path="rh/absenteismo" element={<AbsenteeismPage />} />
      <Route path="rh/recrutamento" element={<RecruitmentPage />} />
    </>
  );
}
