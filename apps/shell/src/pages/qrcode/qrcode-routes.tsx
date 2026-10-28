import { Route } from 'react-router-dom';
import { QrCodePage } from './QrCodePage';

export function QrCodeRoutes() {
  return (
    <>
      <Route path="qrcode" element={<QrCodePage />} />
    </>
  );
}
