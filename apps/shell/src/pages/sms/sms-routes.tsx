import { Route } from 'react-router-dom';
import { SmsDashboardPage } from './SmsDashboardPage';
import { PeriodicExamsPage } from './PeriodicExamsPage';

export function SmsRoutes() {
  return (
    <>
      <Route path="sms" element={<SmsDashboardPage />} />
      <Route path="sms/exames" element={<PeriodicExamsPage />} />
    </>
  );
}
