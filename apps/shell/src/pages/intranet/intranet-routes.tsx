import { Route } from 'react-router-dom';
import { IntranetAdminHomePage } from './IntranetAdminHomePage';
import { NewsEditorPage } from './NewsEditorPage';
import { BirthdayEditorPage } from './BirthdayEditorPage';
import { NewPeopleEditorPage } from './NewPeopleEditorPage';
import { InterviewEditorPage } from './InterviewEditorPage';
import { CampaignEditorPage } from './CampaignEditorPage';
import { ServicesEditorPage } from './ServicesEditorPage';

export function IntranetAdminRoutes() {
  return (
    <>
      <Route path="intranet" element={<IntranetAdminHomePage />} />
      <Route path="intranet/noticias" element={<NewsEditorPage />} />
      <Route path="intranet/aniversariantes" element={<BirthdayEditorPage />} />
      <Route path="intranet/novos" element={<NewPeopleEditorPage />} />
      <Route path="intranet/entrevista" element={<InterviewEditorPage />} />
      <Route path="intranet/campanhas" element={<CampaignEditorPage />} />
      <Route path="intranet/servicos" element={<ServicesEditorPage />} />
    </>
  );
}
