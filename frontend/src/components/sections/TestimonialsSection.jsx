import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    quote: 'No sabía que necesitaba esto hasta que lo tuve. Ahora no concibo mi escritorio sin ella.',
    author: 'María L.',
    variant: 'CALMA',
    variantColor: '270 60% 60%',
  },
  {
    id: 2,
    quote: 'Elegí ENFOQUE sin pensarlo. Era exactamente lo que buscaba, aunque no sabía cómo describirlo.',
    author: 'Carlos R.',
    variant: 'ENFOQUE',
    variantColor: '200 80% 55%',
  },
  {
    id: 3,
    quote: 'Mis amigos siempre comentan la luz. No es solo decoración, es parte de quién soy.',
    author: 'Ana P.',
    variant: 'PROFUNDO',
    variantColor: '35 90% 60%',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full transition-all duration-700"
        style={{
          background: `radial-gradient(circle, hsl(${current.variantColor} / 0.1), transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm tracking-ultra uppercase text-muted-foreground mb-4 font-body">
            Lo que dicen
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-light">
            Conexiones reales.
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-12">
          <Quote 
            className="absolute top-8 left-8 w-10 h-10 opacity-10"
            style={{ color: `hsl(${current.variantColor})` }}
          />
          
          <div className="text-center">
            <p className="text-xl md:text-2xl font-display font-light leading-relaxed mb-8 text-foreground/90">
              "{current.quote}"
            </p>
            
            <div className="flex items-center justify-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: `hsl(${current.variantColor})` }}
              />
              <span className="text-sm font-body text-muted-foreground">
                {current.author} — {current.variant}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevTestimonial}
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'bg-foreground w-6' 
                    : 'bg-foreground/30 hover:bg-foreground/50'
                }`}
                aria-label={`Ver testimonio ${idx + 1}`}
              />
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextTestimonial}
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
