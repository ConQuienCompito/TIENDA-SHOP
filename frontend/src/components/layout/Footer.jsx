import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Shield } from 'lucide-react';

// Payment icons component - monochrome
const PaymentIcons = () => (
  <div className="flex items-center gap-3 opacity-40">
    {/* Visa */}
    <svg className="h-5 w-auto" viewBox="0 0 48 32" fill="currentColor">
      <path d="M17.6 11.2l-2.8 9.6h-2.4l-1.4-7.6c-.1-.4-.2-.5-.5-.7-.5-.3-1.4-.5-2.2-.7l.1-.6h3.8c.5 0 .9.3 1 .9l.9 5 2.4-5.9h2.4l.7 9.6h-2.3l-.5-7.2-2.3 7.2h-1.6l-1.3-7.6zm10.4 6.5c0-2.5-3.5-2.7-3.5-3.8 0-.3.3-.7 1-.8.3 0 1.3-.1 2.4.5l.4-2c-.6-.2-1.3-.4-2.2-.4-2.3 0-4 1.2-4 3 0 1.3 1.2 2 2.1 2.5.9.5 1.2.8 1.2 1.2 0 .7-.7 1-1.4 1-.6 0-1.3-.1-2.5-.7l-.5 2c.6.3 1.6.5 2.7.5 2.5 0 4.1-1.2 4.1-3zm6.1 3.1h2.1l-1.9-9.6h-2c-.4 0-.8.2-1 .6l-3.4 9h2.4l.5-1.3h2.9l.4 1.3zm-2.5-3.2l1.2-3.3.7 3.3h-1.9zm-8.8-6.4l-1.9 9.6h-2.3l1.9-9.6h2.3z"/>
    </svg>
    {/* Mastercard */}
    <svg className="h-5 w-auto" viewBox="0 0 48 32" fill="currentColor">
      <circle cx="18" cy="16" r="8" fillOpacity="0.6"/>
      <circle cx="30" cy="16" r="8" fillOpacity="0.6"/>
    </svg>
    {/* PayPal */}
    <svg className="h-4 w-auto" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.653h6.405c2.108 0 3.582.47 4.388 1.4.72.831.909 1.937.58 3.375l-.009.037v.325l.253.127c.21.106.376.237.504.392.234.282.383.637.448 1.052.066.428.046.937-.061 1.507-.123.654-.326 1.225-.6 1.697a3.77 3.77 0 0 1-.97 1.132c-.389.29-.842.506-1.347.64-.49.13-1.043.197-1.64.197H11.31a.932.932 0 0 0-.921.79l-.014.078-.553 3.512-.012.062a.932.932 0 0 1-.921.79H7.076z"/>
    </svg>
    {/* Apple Pay */}
    <svg className="h-4 w-auto" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
    </svg>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Trust bar */}
      <div className="border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Pago seguro · Datos encriptados</span>
            </div>
            <PaymentIcons />
          </div>
        </div>
      </div>

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
            <p className="text-muted-foreground font-body text-sm max-w-sm leading-relaxed mb-6">
              Identidad a través de la luz. Cada LUMEI es único, como quien lo elige.
            </p>
            {/* Guarantee in footer */}
            <div className="bg-background/30 rounded-lg p-4 max-w-sm">
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                30 días para devoluciones · Garantía de 2 años · Envío gratuito en península
              </p>
            </div>
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
            <div className="mt-6">
              <h4 className="text-sm font-body uppercase tracking-wider text-foreground mb-3">
                Soporte
              </h4>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                Respondemos en menos de 24h laborables
              </p>
            </div>
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
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Política de Devoluciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
