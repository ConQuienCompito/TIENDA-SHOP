import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ConceptSection from '@/components/sections/ConceptSection';
import VariantsSection from '@/components/sections/VariantsSection';
import ContextSection from '@/components/sections/ContextSection';
import ReassuranceSection from '@/components/sections/ReassuranceSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Header />
      
      {/* Download Shopify Theme Banner */}
      <div className="fixed bottom-6 left-6 z-50">
        <a 
          href="/lumei-theme.zip" 
          download="lumei-theme.zip"
          className="group"
        >
          <Button 
            variant="premium" 
            size="lg"
            className="shadow-lg shadow-accent/20 gap-2"
          >
            <Download className="w-4 h-4" />
            Descargar Tema Shopify (.zip)
          </Button>
        </a>
      </div>
      
      <HeroSection />
      <ConceptSection />
      <VariantsSection />
      <ReassuranceSection />
      <ContextSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
