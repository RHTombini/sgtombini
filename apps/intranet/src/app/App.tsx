import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { LeadershipMessage } from '../components/LeadershipMessage';
import { NewsSection } from '../components/NewsSection';
import { BirthdaySection } from '../components/BirthdaySection';
import { NewPeopleSection } from '../components/NewPeopleSection';
import { EmployeeInterview } from '../components/EmployeeInterview';
import { ServicesSection } from '../components/ServicesSection';
import { CampaignSection } from '../components/CampaignSection';
import { Footer } from '../components/Footer';

export function App() {
  return (
    <div className="intra-root">
      <Header />
      <main>
        <Hero />
        <LeadershipMessage />
        <NewsSection />
        <BirthdaySection />
        <NewPeopleSection />
        <EmployeeInterview />
        <ServicesSection />
        <CampaignSection />
      </main>
      <Footer />
    </div>
  );
}
