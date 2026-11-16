import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { NewsSection } from '../components/NewsSection';
import { NewPeopleSection } from '../components/NewPeopleSection';
import { BirthdaySection } from '../components/BirthdaySection';
import { CampaignSection } from '../components/CampaignSection';
import { CalendarSection } from '../components/CalendarSection';
import { BenefitsCarousel } from '../components/BenefitsCarousel';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="intra-root">
      <Header />
      <main>
        <Hero />
        <CampaignSection />

        {/* SEÇÃO RH TOMBINI */}
        <div className="intra-container" style={{ paddingTop: '40px' }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '-0.5px',
            margin: '0 0 24px 0',
            color: 'var(--intra-graphite)'
          }}>
            RH <span style={{ color: 'var(--intra-green)' }}>Tombini</span>
          </h2>
        </div>

        <div className="intra-container intra-grid-2col" style={{ paddingTop: 0 }}>
          <BirthdaySection />
          <CalendarSection />
        </div>

        <div className="intra-container" style={{ paddingBottom: '40px' }}>
          <BenefitsCarousel />
        </div>
        {/* FIM SEÇÃO RH TOMBINI */}

        <div className="intra-container intra-grid-2col">
          <NewsSection />
          <NewPeopleSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
