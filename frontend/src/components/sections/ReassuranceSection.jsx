import React from 'react';
import { Truck, RotateCcw, Shield, Package } from 'lucide-react';

export default function ReassuranceSection() {
  return (
    <section className="py-20 border-y border-border/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Free Shipping */}
          <div className="text-center">
            <Truck className="w-6 h-6 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-foreground/80 font-body mb-1">Envío gratuito</p>
            <p className="text-xs text-muted-foreground/60">España peninsular 24-48h</p>
          </div>

          {/* Returns */}
          <div className="text-center">
            <RotateCcw className="w-6 h-6 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-foreground/80 font-body mb-1">30 días</p>
            <p className="text-xs text-muted-foreground/60">Devolución sin preguntas</p>
          </div>

          {/* Secure Payment */}
          <div className="text-center">
            <Shield className="w-6 h-6 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-foreground/80 font-body mb-1">Pago seguro</p>
            <p className="text-xs text-muted-foreground/60">Datos encriptados</p>
          </div>

          {/* Warranty */}
          <div className="text-center">
            <Package className="w-6 h-6 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-foreground/80 font-body mb-1">Garantía 2 años</p>
            <p className="text-xs text-muted-foreground/60">Tranquilidad total</p>
          </div>
        </div>
      </div>
    </section>
  );
}
