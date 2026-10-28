import { Route } from 'react-router-dom';
import { ProfilesPage } from './ProfilesPage';

export function AdminRoutes() {
  return (
    <>
      <Route path="admin/perfis" element={<ProfilesPage />} />
    </>
  );
}
