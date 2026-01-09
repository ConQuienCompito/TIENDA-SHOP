import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield } from 'lucide-react';

const PRODUCT_IMAGE = "https://customer-assets.emergentagent.com/job_6124748f-9cf1-498a-bc35-1136535c2dc5/artifacts/35uqwoz6_image.png";

const variants = [
  {
    id: 'calma',
    name: 'CALMA',
    description: 'Para quienes buscan silencio en la luz.',
    identity: 'Introspectivo. Sereno. Profundo.',
    colorHsl: '270 60% 60%',
    colorName: 'Púrpura',
  },
  {
    id: 'enfoque',
    name: 'ENFOQUE',
    description: 'Para quienes piensan mejor en azul.',
    identity: 'Claro. Preciso. Decidido.',
    colorHsl: '200 80% 55%',
    colorName: 'Azul',
  },
  {
    id: 'profundo',
    name: 'PROFUNDO',
    description: 'Para quienes prefieren la calidez.',
    identity: 'Cálido. Presente. Cercano.',
    colorHsl: '35 90% 60%',
    colorName: 'Ámbar',
  },
];

export default function VariantsSection() {
  const [activeVariant, setActiveVariant] = useState(variants[0]);

  return (
    <section id="variantes" className="relative py-32 overflow-hidden">
      {/* Dynamic background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, hsl(${activeVariant.colorHsl} / 0.15), transparent 60%)`,
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-ultra uppercase text-muted-foreground mb-4 font-body">
            Colección
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light">
            Elige tu identidad.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Product Preview */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow effect */}
              <div 
                className="absolute inset-0 transition-all duration-700"
                style={{
                  background: `radial-gradient(circle at center, hsl(${activeVariant.colorHsl} / 0.4), transparent 60%)`,
                  filter: 'blur(50px)',
                  transform: 'scale(1.3)',
                }}
              />
              
              <img
                src={PRODUCT_IMAGE}
                alt={`LUMEI ${activeVariant.name}`}
                className="relative z-10 w-full max-w-sm transition-all duration-500"
              />
            </div>
          </div>

          {/* Variant Cards */}
          <div className="space-y-4">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setActiveVariant(variant)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 group ${
                  activeVariant.id === variant.id
                    ? 'bg-card border-foreground/20'
                    : 'bg-transparent border-border hover:border-foreground/10 hover:bg-card/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Color indicator */}
                  <div 
                    className="w-4 h-4 rounded-full mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `hsl(${variant.colorHsl})` }}
                  />
                  
                  <div className="flex-1">
                    <h3 
                      className={`text-2xl font-display font-light mb-2 transition-colors duration-300 ${
                        activeVariant.id === variant.id 
                          ? '' 
                          : 'text-foreground/70'
                      }`}
                      style={activeVariant.id === variant.id ? { color: `hsl(${variant.colorHsl})` } : {}}
                    >
                      {variant.name}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm mb-2">
                      {variant.description}
                    </p>
                    <p className="text-xs text-muted-foreground/60 italic">
                      {variant.identity}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <ArrowRight 
                    className={`w-5 h-5 mt-1 transition-all duration-300 ${
                      activeVariant.id === variant.id
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-2'
                    }`}
                    style={{ color: `hsl(${variant.colorHsl})` }}
                  />
                </div>
              </button>
            ))}

            {/* CTA */}
            <div className="pt-6">
              <Button 
                asChild 
                variant="premium" 
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link to={`/producto/${activeVariant.id}`}>
                  Elegir {activeVariant.name}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              {/* Trust micro-copy */}
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground/50">
                <Shield className="w-3 h-3" />
                <span>Pago seguro · Devolución en 30 días</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
