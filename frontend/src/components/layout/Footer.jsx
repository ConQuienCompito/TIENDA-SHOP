import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-3xl font-display font-light tracking-widest text-foreground mb-4 inline-block"
            >
              LUMEI
            </Link>
            <p className="text-muted-foreground font-body text-sm max-w-sm leading-relaxed">
              Identidad a través de la luz. Cada LUMEI es único, como quien lo elige.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-body uppercase tracking-wider text-foreground mb-4">
              Navegación
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/#variantes"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Colección
              </Link>
              <Link
                to="/#concepto"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Concepto
              </Link>
              <Link
                to="/#faq"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-body uppercase tracking-wider text-foreground mb-4">
              Contacto
            </h4>
            <nav className="flex flex-col gap-3">
              <a
                href="mailto:hola@lumei.es"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                hola@lumei.es
              </a>
              <span className="text-sm text-muted-foreground">
                España
              </span>
            </nav>
          </div>
        </div>

        <Separator className="bg-border mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LUMEI. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
