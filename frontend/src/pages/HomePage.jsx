import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ConceptSection from '@/components/sections/ConceptSection';
import VariantsSection from '@/components/sections/VariantsSection';
import ContextSection from '@/components/sections/ContextSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Header />
      <HeroSection />
      <ConceptSection />
      <VariantsSection />
      <ContextSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
