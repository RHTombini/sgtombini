import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { NewsSection } from '../components/NewsSection';
import { NewPeopleSection } from '../components/NewPeopleSection';
import { BirthdaySection } from '../components/BirthdaySection';
import { CampaignSection } from '../components/CampaignSection';
import { CalendarSection } from '../components/CalendarSection';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="intra-root">
      <Header />
      <main>
        <Hero />
        <CampaignSection />
        
        <div className="intra-container intra-grid-2col">
          <NewsSection />
          <CalendarSection />
        </div>

        <div className="intra-container intra-grid-2col">
          <NewPeopleSection />
          <BirthdaySection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
