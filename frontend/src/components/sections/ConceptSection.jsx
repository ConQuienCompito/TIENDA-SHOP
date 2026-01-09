import React from 'react';

export default function ConceptSection() {
  return (
    <section id="concepto" className="relative py-32 overflow-hidden">
      {/* Subtle background element */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(270 60% 50% / 0.1), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-sm tracking-ultra uppercase text-muted-foreground mb-8 font-body">
          El concepto
        </p>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light leading-tight mb-8">
          No todas las luces
          <br />
          <span className="text-muted-foreground">se sienten igual.</span>
        </h2>
        
        <p className="text-lg text-muted-foreground font-body font-light max-w-2xl mx-auto leading-relaxed">
          Hay quienes buscan calma en el púrpura. Hay quienes piensan mejor en azul. 
          Hay quienes prefieren la calidez del ámbar. Tu elección de luz no es decoración, 
          es una declaración silenciosa de quién eres.
        </p>
      </div>
    </section>
  );
}
