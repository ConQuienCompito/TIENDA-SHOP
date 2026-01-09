import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: '¿Cómo funciona el envío?',
    answer: 'Envío gratuito a toda España peninsular en 24-48h laborables. Baleares, Canarias y Portugal tienen un coste adicional calculado al finalizar la compra.',
  },
  {
    question: '¿Qué fuente de alimentación necesita?',
    answer: 'LUMEI funciona mediante conexión USB-C. Incluye un cable de 2 metros. Puedes conectarla a cualquier puerto USB, adaptador de corriente o powerbank.',
  },
  {
    question: '¿Puedo devolver el producto?',
    answer: 'Sí, tienes 30 días desde la recepción para devolver tu LUMEI sin usar y en su embalaje original. Contacta con nosotros para iniciar el proceso.',
  },
  {
    question: '¿Cada pieza es única?',
    answer: 'Sí. Cada LUMEI está hecha con cristales de amatista naturales, por lo que cada pieza tiene variaciones únicas en forma y tonalidad.',
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="relative py-32 overflow-hidden bg-card">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm tracking-ultra uppercase text-muted-foreground mb-4 font-body">
            Preguntas
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-light">
            Lo esencial.
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border rounded-xl px-6 data-[state=open]:bg-background/50"
            >
              <AccordionTrigger className="text-left font-body text-base hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
