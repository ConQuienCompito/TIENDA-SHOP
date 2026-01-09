import React from 'react';

const contexts = [
  {
    id: 'desk',
    title: 'En tu escritorio',
    description: 'Donde las ideas toman forma.',
    image: 'https://images.pexels.com/photos/35580877/pexels-photo-35580877.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'bedside',
    title: 'Junto a tu cama',
    description: 'Donde el día termina y comienza.',
    image: 'https://images.pexels.com/photos/2082092/pexels-photo-2082092.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'shelf',
    title: 'En tu estante',
    description: 'Donde lo personal se muestra.',
    image: 'https://images.pexels.com/photos/2387754/pexels-photo-2387754.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function ContextSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-ultra uppercase text-muted-foreground mb-4 font-body">
            En tu espacio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light">
            Cómo vive en tu vida.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {contexts.map((context, index) => (
            <div 
              key={context.id}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5]"
            >
              {/* Image */}
              <img
                src={context.image}
                alt={context.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-display font-light text-foreground mb-2">
                  {context.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {context.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
