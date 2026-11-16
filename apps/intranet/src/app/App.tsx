import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { BenefitPartnerPage } from '../pages/BenefitPartnerPage';
import '../styles/intranet.css';
import '../pages/benefits.css';

export function App() {
  return (
    // O BrowserRouter PRECISA envolver tudo que usa Link ou navegação
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beneficios/:id" element={<BenefitPartnerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
