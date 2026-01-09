import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react';

const PRODUCT_IMAGE = "https://customer-assets.emergentagent.com/job_6124748f-9cf1-498a-bc35-1136535c2dc5/artifacts/35uqwoz6_image.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, hsl(270 60% 50% / 0.15), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full animate-pulse-glow animation-delay-200"
          style={{
            background: 'radial-gradient(circle, hsl(200 80% 50% / 0.1), transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p 
              className="text-sm tracking-ultra uppercase text-muted-foreground mb-6 font-body opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              Tu luz. Tu elección.
            </p>
            
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-light leading-tight mb-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              La luz que eliges
              <br />
              <span className="text-gradient-purple">dice quién eres.</span>
            </h1>
            
            <p 
              className="text-lg text-muted-foreground font-body font-light max-w-lg mx-auto lg:mx-0 mb-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
              LUMEI no vende lámparas. LUMEI ofrece identidad a través de la luz.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            >
              <Button 
                asChild 
                variant="premium" 
                size="xl"
                className="group"
              >
                <Link to="/producto/calma">
                  Elige tu luz
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="xl"
              >
                <a href="#variantes">
                  Ver colección
                </a>
              </Button>
            </div>

            {/* Trust indicators below CTA */}
            <div 
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                <Truck className="w-4 h-4" />
                <span>Envío gratuito</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                <RotateCcw className="w-4 h-4" />
                <span>30 días devolución</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                <Shield className="w-4 h-4" />
                <span>Pago seguro</span>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div 
            className="order-1 lg:order-2 flex justify-center opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            <div className="relative">
              {/* Glow behind product */}
              <div 
                className="absolute inset-0 animate-pulse-glow"
                style={{
                  background: 'radial-gradient(circle at center, hsl(270 60% 50% / 0.3), transparent 60%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.2)',
                }}
              />
              
              <img
                src={PRODUCT_IMAGE}
                alt="LUMEI Lámpara de Amatista"
                className="relative z-10 w-full max-w-md lg:max-w-lg animate-float"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs tracking-wider uppercase font-body text-muted-foreground">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-foreground/50 to-transparent" />
      </div>
    </section>
  );
}
